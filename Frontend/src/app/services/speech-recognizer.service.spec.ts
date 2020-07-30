import { TestBed } from '@angular/core/testing';

import { SpeechRecognizerService } from './speech-recognizer.service';

describe('SpeechRecognizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechRecognizerService = TestBed.get(SpeechRecognizerService);
    expect(service).toBeTruthy();
  });
});
