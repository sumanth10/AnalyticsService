import { Injectable,Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpErrorResponse
} from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginService} from "../services/login.service";
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    login: any = {};
    
    constructor(private injector: Injector,private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        let errorMessage = "";
        const loginService = this.injector.get(LoginService);
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status == 401) {
                // Handle 401 error
                loginService.login().subscribe((data: {}) => {
                    console.log(data)
                    this.login = data;
                    if(this.login.authenticated == true){
                      //If it is true then it will navigate the user to the root 
                        this.router.navigate(['']);
                    }else{
                        errorMessage = `Authentication Failed`
                        return throwError(errorMessage);
                    }
                  })
              } else {
                return throwError(err);
              }
            })
          );
  }
}