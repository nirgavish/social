// https://github.com/Ismaestro/angular6-example-app/blob/master/src/app/app.module.ts
// https://stackoverflow.com/questions/34516651/set-base-url-for-angular-2-http-requests
// https://www.coditty.com/code/angular-6-interceptor-response-example

import {tap} from 'rxjs/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(/*private authService: AuthService*/) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.apiurl;
    req = req.clone({
      url: url + req.url,
      withCredentials: true
    });

    return next.handle(req)

      .pipe (
        tap (

          event => {
            if (event instanceof HttpResponse) {
              /*
              console.log(' all looks good');
              // http response status code
              console.log(event.status);
              */
            }
          },

          error => {
            // http response status code
            console.log('----response----');
            console.error('status code:');
            console.error(error.status);
            console.error(error.message);
            console.log('--- end of response---');
          }

        )
      );

  }
}
