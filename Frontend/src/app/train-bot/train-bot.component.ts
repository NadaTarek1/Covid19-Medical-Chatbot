import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpResponse
} from '@angular/common/http';
import {
  ToastrService
} from 'ngx-toastr';

import {
  LinkService
} from '../link.service';

@Component({
  selector: 'app-train-bot',
  templateUrl: './train-bot.component.html',
  styleUrls: ['./train-bot.component.css']
})
export class TrainBotComponent implements OnInit {
  file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  constructor(private toastr: ToastrService, private linkService: LinkService) {}

  ngOnInit() {}

  trainNow() {
      this.linkService.train_now().subscribe(result => {
      console.log(result),
      this.toastr.success(result.message, 'server');
    });
  }
  uploadfile() {
    if (!this.file) {
      this.toastr.error('Please add a csv file', 'server');
      return false;
    }
    this.linkService.train_file(this.file)
      .subscribe(event => {
        if (event instanceof HttpResponse) {
          console.log(event),
          this.toastr.success('Your File Is Uploaded Successfuly', 'server');
        }
      }, error => {
        console.log(error),
        this.toastr.error('Something went wrong!', 'server');
      });
  }


  readFile(e) {
    this.file = e.target.files[0];
    console.log(this.file);
  }
}
