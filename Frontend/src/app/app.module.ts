import { AuthGuardService } from './auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { DialogflowService } from './services/dialogflow.service';
import { MessageListComponent, MessageFormComponent, MessageItemComponent } from './components/index';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { WelcomemessageComponent } from './welcomemessage/welcomemessage.component';
import { TrainBotComponent } from './train-bot/train-bot.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { LinkService } from './link.service';
import { SharedModule } from './shared/shared.module';
import { SpeechRecognizerService } from './services/speech-recognizer.service';
import { LoginComponent } from './login/login.component';
import { NewstyleComponent } from './newstyle/newstyle.component';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';
import { SanitizeHtmlnpmPipe } from './pipe/sanitize-htmlnpm.pipe';


const appRoutes: Routes = [
  
  {path:'login',component:LoginComponent},
  { path: 'talk', component: ChatComponent /*,canActivate: [AuthGuardService]*/},
  { path: 'train-bot', component: TrainBotComponent },
  { path: '', redirectTo: 'talk', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent,
    HeaderComponent,
    ChatComponent,
    WelcomemessageComponent,
    TrainBotComponent,
    QuestionAnswerComponent,
    LoginComponent,
    NewstyleComponent,
    SanitizeHtmlPipe,
    SanitizeHtmlnpmPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SidebarModule.forRoot(),
    SharedModule,
  ],
  providers: [
    DialogflowService,
    LinkService,
    SpeechRecognizerService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
