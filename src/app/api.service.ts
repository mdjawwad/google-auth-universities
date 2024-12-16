import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
 

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
           environment.apiKey,
          'x-rapidapi-host': 'colleges-and-universities.p.rapidapi.com',
        },
      }
    );
  }
}
