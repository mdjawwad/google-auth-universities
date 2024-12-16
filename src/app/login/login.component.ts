declare var google: any;

import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
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
      } else {
        console.error('Google API failed to load.');
      }
    }).catch(error => {
      console.error('Failed to load Google API script:', error);
    });
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined') {
   
        resolve();
      } else {
        
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      }
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginHandle(res: any) {
    if (res) {
      const payload = this.decodeToken(res.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.router.navigate(['home']);
    }
  }
}
