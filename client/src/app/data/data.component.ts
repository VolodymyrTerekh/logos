import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  formAdd: boolean = false;
  userList: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/users/add') {
          this.formAdd = true;
          this.userList = false;
        }
      }
    });
  }

  ngOnInit() {
  }

}
