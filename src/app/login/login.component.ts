declare var google: any;
import { JsonpInterceptor } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '758590368190-sp25ub1u8uqekp6e0va58obgr94vcic9.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.loginHandle(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_black',
      size: 'large',
      shape: 'circular',
      width: 350,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginHandle(res: any) {
    if (res) {
      const palyload = this.decodeToken(res.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(palyload));
      this.router.navigate(['home']);
    }
  }
}
