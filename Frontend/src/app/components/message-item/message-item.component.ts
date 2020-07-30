import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService } from '@app/services';
import { Router } from '@angular/router';
import { SanitizeHtmlPipe } from '../../pipe/sanitize-html.pipe';



@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  
  @Input() messages: Message[];
  @Input() input: Message;
  sender: string;
  start:boolean = false;
  width = 253;
  startChatv;
  firstTime:boolean = true;
  loading:boolean;
  loadingbot:boolean = false;
  error;
  testLoading:boolean = false;
  btns = [];
  btnInclude;
  msgBtn:string;
  replyArr = [];
  // buttonText =`يا هاجر ممكن تختار ايه المشكلة من دول : <button (onclick)="getNameBtn('error1')" class="btn chat-btn" >انقطاع الخدمة</button><br> <button (onclick)="getNameBtn('error2')" class="btn chat-btn">عدم ثبات الخدمة</button><br> <button (click)="getNameBtn('error3')" class="btn chat-btn" >عطل في الخط الارضي</button><br>`
  // test = this.buttonText.substr(10);
  constructor(private dialogFlow: DialogflowService,
              private router:Router,
    ) { }

  ngOnInit() {
    // let checkBtn = this.input.message.includes("</button>")
    if(this.input.message.includes("</button>")){
      this.replyArr = this.input.message.split(/(<button)/);
      //console.log(this.replyArr)
      this.msgBtn = this.replyArr[0];
      this.btnInclude =true;
      this.splitStr(this.replyArr);
    }
    else{
      this.btnInclude = false;
    }
    // //console.log(this.input.message)
    this.loading =this.dialogFlow.loading;
    if(this.dialogFlow.count == 0){
     this.firstTime = true
     this.dialogFlow.count +=1;
    }
    else{
        this.firstTime = false;
    }

    this.sender = this.dialogFlow.getSender;
    // //console.log(this.sender);
    setTimeout(() => {
    this.start = true;
    this.loading=false;
    this.error = this.dialogFlow.error;
    }, 500);
  }

 
  getNameBtn(btnName,btnTxt){
    //console.log(btnName);
    this.dialogFlow.testtxt = btnName;
    this.dialogFlow.btnTxt =btnTxt;
    

    this.dialogFlow.testb = true;
    
  }

  startChat(ref){
      this.startChatv = this.dialogFlow.startChat =true
     
  }

  splitStr(arr){
    arr.forEach(element => {
      //console.log(element)
      if(element.includes("</button>")){
          //console.log("include")
          let endStrAction = element.lastIndexOf("'")
          let startStrAction= element.indexOf("'")
          let action = element.substring(startStrAction,endStrAction).substr(1);
          //console.log(action)
          let startStrInner = element.indexOf('>');
          let endStrInner = element.indexOf('<');
          let btnTxt = element.substring(startStrInner,endStrInner).substr(1);
          this.btns.push({'btnTxt':btnTxt,'action':action});
      }
      else{
          return
      }
      
    });
  }
}

