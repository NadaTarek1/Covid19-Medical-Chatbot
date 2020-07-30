import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import { DialogflowService } from '../../services/dialogflow.service';
import { Message } from '@app/models';
import { SpeechRecognizerService } from '../../services/speech-recognizer.service';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  messageIn = false;
  @Input() input: Message;

  @Input() messages: Message[];
  rColor="#495057";
  send_icon = "#ffffff";
  recordingRef:boolean = false

  finalTranscript = '';
  recognizing = false;
  currentLanguage: string='ar-EG';
  startChat:boolean = false
  testb:boolean = false;
  testtxt;
  userId;



  constructor(private dialogFlowService: DialogflowService,
              private speechRecognizer : SpeechRecognizerService,
              private changeDetector: ChangeDetectorRef,

    ) { }

  ngOnInit() {
    this.startChat = this.dialogFlowService.startChat
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.userId = localStorage.getItem('id');
  }
  ngDoCheck(){
    this.startChat = this.dialogFlowService.startChat
    this.testb = this.dialogFlowService.testb
    // console.log(this.testb)
    if(this.testb==true){
      this.finalTranscript =this.dialogFlowService.testtxt;
      this.sendMessage('key');
    }
  }
  
  public sendMessage(ref): void {
    this.dialogFlowService.loading = true;
    if(this.finalTranscript){
      // this.send_icon="#3d30be";
      if(ref == 'key'){
        if(this.finalTranscript){
         this.input.timestamp = new Date();
         if(this.dialogFlowService.testb){
           //console.log(this.dialogFlowService.btnTxt)
            this.dialogFlowService.testb = false;
            this.messages.push(new Message(this.dialogFlowService.btnTxt,'assets/images/user.png',new Date()))
         }
         else{
          this.messages.push(new Message(this.finalTranscript,'assets/images/user.png',new Date()))
         }
     
         this.dialogFlowService.getResponse(this.finalTranscript, '1').subscribe(res => {
          
          this.dialogFlowService.loading = false;
          this.dialogFlowService.error = false;
           this.messages.push(
             new Message(res.reply, 'assets/images/bot.png', new Date()),
           );
           this.dialogFlowService.setSender('bot');
         },err=>{
           this.dialogFlowService.loading =false;
           this.dialogFlowService.error = true;
         });
     
         this.input = new Message('', 'assets/images/user.png');
     
     
         this.dialogFlowService.setSender('user');
         this.finalTranscript = '';
        }
       }
       else{
         this.input.timestamp = new Date();
         this.messages.push(new Message(this.finalTranscript,'assets/images/user.png',new Date()))
     
         this.dialogFlowService.getResponse(this.finalTranscript,this.userId).subscribe(res => {
          this.dialogFlowService.loading = false;
          this.dialogFlowService.error = false;


           this.messages.push(
             new Message(res.reply, 'assets/images/bot.png', new Date()),
           );
           this.dialogFlowService.setSender('bot');

         },err=>{
           this.dialogFlowService.loading =false;
           this.dialogFlowService.error = true;
         });
     
         this.input = new Message('', 'assets/images/user.png');
     
     
         this.dialogFlowService.setSender('user');
         this.finalTranscript = '';
       }
    }
   
   
  }

  convertToTxt(event){
    if(this.recordingRef == false){
      this.speechRecognizer.start(event.timeStamp);
 
      this.recordingRef = true;
      this.rColor = "red"
    }
    else{
      this.speechRecognizer.stop();
      this.recordingRef = false;

      this.rColor = "#495057"
    }
    this.input.timestamp = new Date();
    
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }

    this.speechRecognizer.start(event.timeStamp);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
      });

    this.speechRecognizer.onResult()
      .subscribe((data) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript} ${message}`;
         
        }
      });

    
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}


