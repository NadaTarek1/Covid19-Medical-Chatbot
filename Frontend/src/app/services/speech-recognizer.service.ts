import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { SpeechRecognition } from '../models/speechRecognition';
const { webkitSpeechRecognition }: SpeechRecognition = <SpeechRecognition>window;

@Injectable()
export class SpeechRecognizerService {

  recognition: any;
  startTimestamp;
  ignoreOnEnd: boolean;
  language: string;

  constructor() {}

  initialize(language: string): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = language;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
  }

 

  start(timestamp) {
    this.startTimestamp = timestamp;
    this.recognition.start();
  }

  onStart(): Observable<any> {
    if (!this.recognition) {
      this.initialize(this.language);
    }

    return new Observable(observer => {
      this.recognition.onstart = () => {
        observer.next({
          info: 'info_speak_now'
        });
      };
    });
  }

  onEnd(): Observable<any> {
    return new Observable(observer => {
      this.recognition.onend = () => {
        if (this.ignoreOnEnd) {
          return;
        }

        observer.next({
          info: 'info_start'
        });
      };
    });
  }

  onResult(): Observable<any> {
    return new Observable(observer => {
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        observer.next({
          info: 'final_transcript',
          content: finalTranscript
        });
        observer.next({
          info: 'interim_transcript',
          content: interimTranscript
        });
      };
    });
  }


  stop() {
    this.recognition.stop();
  }
}
