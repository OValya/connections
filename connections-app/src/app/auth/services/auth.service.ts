import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { LOGIN, REGISTRATION } from 'src/app/endpoints/endpoints';

interface AuthResponse {
  code?: string;
  token: string;
  uid: string
}


@Injectable()
export class AuthService {
  isLoggedIn:boolean;

  constructor(private http:HttpClient, private snakbarService:SnackBarService, private router:Router) {
    this.isLoggedIn=true;
   }
   

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  guardTrue(){
    this.isLoggedIn=true;
  }

  registration(name:string, email:string, password:string):Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(REGISTRATION, {email, name, password}, {observe: 'response'}).
    pipe(catchError(this.handleError),
           tap(()=>{this.snakbarService.openSnackBar('Success!'); 
                  this.router.navigate(['/signin'])}
            ))
  }

  login(email:string, password:string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(LOGIN, {email, password}, {observe: 'response'}).
    pipe(catchError(this.handleError),
         tap(()=>{this.isLoggedIn=true; 
                  this.snakbarService.openSnackBar('Success!'); 
                  }
            )
        )
  }

  logout(): void {  
    this.isLoggedIn = false;
  }

  private handleError = (error: HttpErrorResponse) => {
    this.snakbarService.openSnackBar(error.error.message);
    return throwError(() => error.message);
  }

}

