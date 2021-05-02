import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // private apiURL = "http://localhost:10010";
  private apiURL = "http://54.66.83.80:10010";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.apiURL + '/courses')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error ? error.error.message : error.statusText;
    }
    return throwError(errorMessage);
 }

}
