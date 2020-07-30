import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionAnswerArrayOfObject } from '../models/QandA';


// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {


  QuestionAnswerObject = new QuestionAnswerArrayOfObject('', '');
   train = [this.QuestionAnswerObject];


  constructor(private linkService: LinkService, private toastr: ToastrService) { }

  ngOnInit() {}

  addMore() {
    this.QuestionAnswerObject = new QuestionAnswerArrayOfObject('', '');
    this.train.push(this.QuestionAnswerObject);
    console.log(this.train);
  }

  onSubmit() {
    console.log(this.train);
    this.linkService.questionanswer(this.train)
      .subscribe(result => {
          console.log(result);
          this.toastr.success(result.message, 'Server');
        });
  }

}
