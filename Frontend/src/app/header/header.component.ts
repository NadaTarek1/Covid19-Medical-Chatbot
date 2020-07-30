import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  closeNav() {
    this.opened = false;
  }

}
