import mysql.connector as mysql
import datetime
import requests
import constants


def checkKey(dict, key):
    if key in dict.keys():
        return True
    else:
        return False


# Replace this with you google places API key in order for the location features to work, or contact me for mine
googleAPIKey = constants.googleAPIKey

# Make sure you put the right credentials hgere connecting to and SQL database that uses the provided .sql file in this repository
mydb = mysql.connect(
    host="localhost",
    user="root",
    password="12345678",
    database="medical_chatbot"
)


def doesUserExist(user):
    cur = mydb.cursor(dictionary=True)
    qry = "SELECT * FROM `user` WHERE `name`= '{}'".format(user)
    cur.execute(qry)
    result = cur.fetchone()
    return False if result is None else True


def registerUser(user, password):
    cur = mydb.cursor()
    sql = "INSERT INTO user (name, password) VALUES (%s, %s)"
    val = (user, password)
    cur.execute(sql, val)
    mydb.commit()
    print(cur.rowcount, "record inserted.")
    return True


def authenticateUser(user, password):
    cur = mydb.cursor(dictionary=True)
    qry = "SELECT * FROM `user` WHERE `name`= '{}' AND `password`= {}".format(user, password)
    cur.execute(qry)
    user = cur.fetchone()
    print(user)
    return False if user is None else True


def doesHaveRecordedSymptoms(user):
    cur = mydb.cursor(dictionary=True)
    qry = "SELECT COUNT(*) FROM `patient_symptoms` WHERE `patient_name` = '{}'".format(user)
    cur.execute(qry)
    count = cur.fetchone()['COUNT(*)']
    print(user)
    print("Count: ", count)
    return False if count == 0 else True


def recordSymptom(user, symptom):
    try:
        cur = mydb.cursor()
        qry = "INSERT INTO `patient_symptoms`(`patient_name`, `symptom_name`) VALUES ('{}','{}')".format(user, symptom)
        cur.execute(qry)
        mydb.commit()
        print(cur.rowcount, "record inserted.")
        return True
    except mysql.Error as err:
        print("Something went wrong: {}".format(err))


def deleteSymptom(user, symptom):
    try:
        cur = mydb.cursor()
        qry = "DELETE FROM `patient_symptoms` WHERE patient_name = '{}' AND symptom_name = '{}'".format(user, symptom)
        cur.execute(qry)
        mydb.commit()
        print(cur.rowcount, "record deleted")
        return True
    except mysql.Error as err:
        print("Something went wrong: {}".format(err))


def generateSymptomReport(user):
    try:
        cur = mydb.cursor(dictionary=True)

        qry = "SELECT COUNT(*) FROM `patient_symptoms` INNER JOIN `symptoms` ON `symptom_name` = `name` WHERE `patient_name` = '{}' AND `type` = 'common'".format(
            user)
        cur.execute(qry)
        patientCommonSymptomsCount = cur.fetchone()['COUNT(*)']
        print(patientCommonSymptomsCount)

        qry = "SELECT COUNT(*) FROM `patient_symptoms` INNER JOIN `symptoms` ON `symptom_name` = `name` WHERE `patient_name` = '{}' AND `type` = 'uncommon'".format(
            user)
        cur.execute(qry)
        patientUncommonSymptomsCount = cur.fetchone()['COUNT(*)']
        print(patientUncommonSymptomsCount)

        qry = "SELECT COUNT(*) FROM `symptoms` WHERE `type` = 'common'".format(user)
        cur.execute(qry)
        totalCommonSymptomsCount = cur.fetchone()['COUNT(*)']
        print(totalCommonSymptomsCount)

        qry = "SELECT COUNT(*) FROM `symptoms` WHERE `type` = 'uncommon'".format(user)
        cur.execute(qry)
        totalUncommonSymptomsCount = cur.fetchone()['COUNT(*)']
        print(totalUncommonSymptomsCount)

        qry = "SELECT * FROM `patient_symptoms` INNER JOIN `symptoms` ON `symptom_name` = `name` WHERE `patient_name` = '{}' AND `type` = 'common'".format(
            user)
        cur.execute(qry)
        commonSymptoms = cur.fetchall()

        qry = "SELECT * FROM `patient_symptoms` INNER JOIN `symptoms` ON `symptom_name` = `name` WHERE `patient_name` = '{}' AND `type` = 'uncommon'".format(
            user)
        cur.execute(qry)
        uncommonSymptoms = cur.fetchall()

        report = ''
        report += 'SYMPTOM REPORT FOR USER: {}'.format(user) + '\n'
        report += '===================================\n'
        report += 'You have {} out of {} common  symptoms:\n\n'.format(patientCommonSymptomsCount,
                                                                       totalCommonSymptomsCount)
        for x in commonSymptoms:
            report += 'SYMPTOM: {}'.format(x['descriptive_name']) + ':\n'
            report += x['description'] + '\n\n'
        report += '\n'
        report += 'You have {} out of {} uncommon  symptoms:\n\n'.format(patientUncommonSymptomsCount,
                                                                         totalUncommonSymptomsCount)
        for x in uncommonSymptoms:
            report += 'SYMPTOM: {}'.format(x['descriptive_name']) + ':\n'
            report += x['description'] + '\n\n'
        report += '===================================\n'

        if patientCommonSymptomsCount > 0:
            report += 'You have common symptoms, please make sure to visit the hospital and get a checkup. Contact the hotline 15335 for advice.\n'
        else:
            report += "You have no common symptoms, it's advices to live normally and monitor your symptoms closely"
        print(report)
        return report

    except mysql.Error as err:
        print("Something went wrong: {}".format(err))


def doeshaveRecordedAddress(user):
    cur = mydb.cursor(dictionary=True)
    qry = "SELECT `address` FROM `user` WHERE `name` = '{}'".format(user)
    cur.execute(qry)
    address = cur.fetchone()['address']
    return True if address != None else False


def recordAddress(user, address):
    cur = mydb.cursor()
    qry = "UPDATE `user` SET `address` = '{}' WHERE `name` = '{}'".format(address, user)
    cur.execute(qry)
    mydb.commit()
    return True


def getNearbyHospitals(user):
    cur = mydb.cursor(dictionary=True)
    qry = "SELECT `address` FROM `user` WHERE `name` = '{}'".format(user)
    cur.execute(qry)
    address = cur.fetchone()['address']
    print("Address: " + address)

    URL = "https://maps.googleapis.com/maps/api/geocode/json?"
    PARAMS = {'key': googleAPIKey, 'address': str(address), 'components': 'country:EG'}
    r = requests.post(url=URL, params=PARAMS)
    data = r.json()

    if data['status'] == 'ZERO_RESULTS':
        return "No hospitals found near your location"

    lat = data['results'][0]['geometry']['location']['lat']
    lng = data['results'][0]['geometry']['location']['lng']

    location = str(lat) + "," + str(lng)

    URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    PARAMS = {'key': googleAPIKey, 'location': location, 'radius': 5000, 'type': 'hospital'}
    r = requests.post(url=URL, params=PARAMS)
    data = r.json()

    result = ""
    result += 'LOCATING NEARBY HOSPITAL FOR USER: {}, ADDRESS: {}'.format(user, address) + '\n'
    result += '===================================\n'
    for hospital in data['results']:
        result += 'HOSPITAL: {}'.format(hospital['name']) + "\n"
        result += 'ADDRESS: {}'.format(hospital['vicinity']) + "\n"
        if checkKey(hospital, 'rating'):
            result += 'RATING: {}'.format(str(hospital['rating'])) + "\n"
        if checkKey(hospital, 'opening_hours'):
            result += 'OPEN NOW: {}'.format('Yes' if hospital['opening_hours']['open_now'] else 'No') + "\n"
        result += '\n'

    result += '===================================\n'
    return result


def getCOVID19Report():
    URL = "https://api.covid19api.com/summary"
    r = requests.get(url=URL)
    data = r.json()
    print(data)
    result = ""
    result += 'Latest COVID-19 report:\n'
    result += 'World:\nNew confirmed: {}, Total confirmed: {}\nNew death: {}, Total death: {}\nNew recovered: {}, Total recovered: {}'.format(
        data['Global']['NewConfirmed'], data['Global']['TotalConfirmed'], data['Global']['NewDeaths'],
        data['Global']['TotalDeaths'], data['Global']['NewRecovered'], data['Global']['TotalRecovered'])
    result += '\n\n'

    for country in data['Countries']:
        if country['Country'] == 'Egypt':
            print('Test')
            result += 'Egypt:\nNew confirmed: {}, Total confirmed: {}\nNew death: {}, Total death: {}\nNew recovered: {}, Total recovered: {}'.format(
                country['NewConfirmed'], country['TotalConfirmed'], country['NewDeaths'], country['TotalDeaths'],
                country['NewRecovered'], country['TotalRecovered'])

    return result
