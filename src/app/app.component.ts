import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp1backoffice';
  authenticated = this.cookieService.get('authenticated') === 'true';
  invalidLogin = false;
  loginControls = {
    user: new FormControl(''),
    password: new FormControl('')
  };
  loginForm = new FormGroup(this.loginControls);

  constructor( private cookieService: CookieService ) { }

  authenticate() {
    var user = this.loginForm.value.user;
    var password = this.loginForm.value.password;
    if (user === 'admin' && password === 'admin') {
      this.cookieService.set('authenticated', 'true');
      this.authenticated = this.cookieService.get('authenticated') === 'true';
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

  logout() {
    this.cookieService.set('authenticated', 'false');
    this.authenticated = this.cookieService.get('authenticated') === 'true';
  }
}
