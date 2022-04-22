import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(take(1),switchMap(user=>{ //switchMap perchè se non c'è un utente loggato non serve fare il token

        const newReq = request.clone({
        headers:request.headers.set('Authorization',`Bearer ${environment.token}`).set("X-TENANT-ID", environment.ourTenant)
      })
      return next.handle(newReq)
    }))
  }
}
