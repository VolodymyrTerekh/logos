import { Component } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  showLayouts: boolean = false;
  showLogin: boolean = false;

  constructor(private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/login' || event['url'] === '/') {
          this.showLayouts = false;
          this.showLogin = true;
        } else {
          this.showLayouts = true;
          this.showLogin = false;
        }
      }
    });

  }
}
