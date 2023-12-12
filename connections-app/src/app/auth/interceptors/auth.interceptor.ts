import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<{}>, next: HttpHandler) {

    if (req.headers.get("skip"))
           return next.handle(req);

    const {email, token, uid} = this.auth.getAuthorization(); 

    const authReq = req.clone({
      setHeaders:{'Authorization': `Bearer ${token}`, 'rs-uid':uid, 'rs-email':email}});

    return next.handle(authReq);
  }
}


