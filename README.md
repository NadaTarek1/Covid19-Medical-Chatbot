# Medical Chatbot

This repository contains a chatbot made with RiveScript, Flask, MySQL, and REACT

Credits to [this](https://github.com/valoro/bot_front?fbclid=IwAR2JfYS-Hn66RGL5GJYoJ-ZSx0NOpbBzfKYT3k0SLXRBt6_eR1dENCf7Irk) repository for the frontend of the chatbot, and [this](https://github.com/valoro/attendance_bot?fbclid=IwAR3mu2DqC5AZffo9fovhmptl96MojM2rqaCr6Xs-gXVgpVQQwRpsEAu4Mds) repository for the base Python/Flask project that I built on.

## Installation and usage
This installation guide assume you have the latest version of python.

### 1. Install flask


```bash
pip install Flask
```

### 2. Start MySQL server

On your local machine, make sure to start MySQL server and have an IDE for managing the server, like SQL Workbench.

### 3. Import MySQL database

You will find a .sql file that you can import into your local MySQL database, which is required for your chatbot to work.

### 4. Edit the base code

There are 2 main parts you want to edit, the firt one is in the `utills.py` folder, where you need you own google places API key for some feature to work in this chatbot.
```python
# Replace this with you google places API key in order for the location features to work, or contact me for mine
googleAPIKey = constants.googleAPIKey
```

The second part if also in the `utills.py` folder. You need to make sure you write your own credentials to connect to your local MySQL Server.
```python
# Make sure you put the right credentials hgere connecting to and SQL database that uses the provided .sql file in this repository
mydb = mysql.connect(
  host="localhost",
  user="root",
  password="12345678",
  database="medical_chatbot"
)
```
### 5. Run flask
In the main directory of the project, where the `main.py` file is, run the following commands:

```bash
export FLASK_APP=main.py
flask run
```
Flask should now be up and running, and you can send requests to the chatbot

### 6. Run the frontend
to run the frontend, navigate to the directory `bot_front` and type the following commands:
```bash
npm install
npm start
```
You will see a message telling you the localhost address you can visit to run the frontend
```bash
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

