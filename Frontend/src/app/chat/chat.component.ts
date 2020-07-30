import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Message
} from '../models';
import { DialogflowService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public message: Message;
  public messages: Message[];
  startChat:boolean = false;

  constructor(private router:Router) {
    
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];
  }
  logout(){
    localStorage.removeItem('id');
    this.router.navigate(['/login'])
  }

  ngOnInit() {
  }

}
