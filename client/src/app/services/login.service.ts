import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface Login {
    authenticated: boolean;
    StatusCode: number;
}

@Injectable()
export class LoginService {
    loginURL: string = '';
    loginCred: any = {
        "username": "admin",
        "password": "admin"
    };
    constructor(private http: HttpClient) {
        this.loginURL = 'api/auth/login'
    }



    /** POST: To login and generate a token */
    login(): Observable<Login> {
        console.log("Login Module ",this.loginURL);
        return this.http.post<Login>(this.loginURL, this.loginCred)
            .pipe(
                catchError(this.errorHandl)
            );
    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
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
}

