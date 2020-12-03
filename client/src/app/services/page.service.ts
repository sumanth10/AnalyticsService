import { Injectable,OnInit } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


class Page {
  pageID: number;
  viewCount: number;
  pages: Array<any>;
}

@Injectable({
  providedIn: "root",
})
export class PageService {
  pageURL: string = "";
  login: any = {};
  pageID: string = "";

  constructor(private http: HttpClient) {
    this.pageURL = "api/pages";
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };


  //Get the page
  GetPageList(): Observable<Page> {
    return this.http
      .get<Page>(this.pageURL)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Get the active user from last half and hour
  GetPageActiveUsers(id):  Observable<Page> {
    
    const options = this.getDatePara("activity");
    return this.http
      .get<Page>(`${this.pageURL}/${id}/activity`,options)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  //Get the page details abt the page

  GetPageDetails(id):  Observable<Page> {
    return this.http
      .get<Page>(`${this.pageURL}/${id}`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Get the rate of the returing users
  GetReturningUserRate(id):  Observable<Page> {
    const options = this.getDatePara("rate");
    return this.http
      .get<Page>(`${this.pageURL}/${id}/activity/rate`,options)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  //Get the count by the countries 
  GetCountries(id):  Observable<Page> {
    return this.http
      .get<Page>(`${this.pageURL}/${id}/country`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getDatePara(action){
    let endtime = new Date().toISOString();
    let starttime;
    if(action == "rate"){
        starttime = new Date (new Date().setDate(new Date().getDate() - 1)).toISOString();
    }else{
        starttime = new Date (new Date().setMinutes(new Date().getMinutes() - 30)).toISOString();
    }
    
    const options = {params: new HttpParams({fromString: `starttime=${starttime}&endtime=${endtime}`})}
    return options;
  }
}
