import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private Http:HttpClient) { }
  getData(prompt:string):any{
    console.log("get data");
    const url="http://localhost:3000/api";
    //let params = { prompt: prompt };
    return this.Http.post<any>(url,{prompt}).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError('Something went wrong with the request.');
      })
    );
  }
}
