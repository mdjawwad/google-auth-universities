import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get(
      'https://colleges-and-universities.p.rapidapi.com/getByState?states=NY%2CDE',
      {
        headers: {
          'x-rapidapi-key':
            'ca4196edd7msh2bb3e04fbf39550p131f00jsnb336cae5b509',
          'x-rapidapi-host': 'colleges-and-universities.p.rapidapi.com',
        },
      }
    );
  }
}
