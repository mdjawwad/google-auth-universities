import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  userData: any;
  data: any = {}
  page: number = 1;
  itemsPerPage: number = 40; 
  loading: boolean = true;

  auth = inject(AuthService);

  constructor(private apiService: ApiService) {}

  signOut() {
    this.auth.signout();
    sessionStorage.removeItem('loggedInUser');
    console.log('Sign out clicked');
  }

  ngOnInit() {
    this.loading = true;
    this.apiService.getData().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        console.log('Data fetched successfully:', res);
         const userString = sessionStorage.getItem('loggedInUser');
        if (userString) {
          this.userData = JSON.parse(userString);
        } else {
          console.error('Your Not Logged in yet!!');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      },
    });
  }
}
