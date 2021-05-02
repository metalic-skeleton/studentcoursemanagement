import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiURL = "http://localhost:10010";
  private apiURL = "http://54.66.83.80:10010";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  login(item: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + '/login', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  signup(item: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + '/signup', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    console.log('error', error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.statusText;
    } else {
      errorMessage = error.error ? error.error.message : error.statusText;
    }
    return throwError(errorMessage);
  }

}