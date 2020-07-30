import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpRequest,
} from '@angular/common/http';

import {
  environment
} from '../environments/environment';
import { QuestionAnswerArrayOfObject } from './models/QandA';


@Injectable({
  providedIn: 'root'
})
export class LinkService {
  url = `${environment.serverUrl}/file_upload`;

  constructor(private http: HttpClient) {}

  questionanswer(array: QuestionAnswerArrayOfObject[]) {

    return this.http.post<{message: string, state: string}>(`${environment.serverUrl}/file_append/`, array);
  }

  train_now() {

    return this.http.post<{message: string, state: string}>(`${environment.serverUrl}/tfidf_train/`, ``);
  }

  train_file(file: File) {
    {

      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.url, formData);



      // send the http-request and subscribe for progress-updates
      return this.http.request(req);
    }

  }
}
