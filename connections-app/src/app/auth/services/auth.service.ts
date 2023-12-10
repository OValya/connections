import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { LOGIN, REGISTRATION } from 'src/app/endpoints/endpoints';

interface AuthResponse {
  code?: string;
  token: string;
  uid: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient, private snakbarService:SnackBarService) { }
   isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  registration():Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(REGISTRATION, {email: 'mam@mail.com', name:'mam', password:'1Aa@23456'}, {observe: 'response'}).
    pipe(catchError(this.handleError))
    
  }

  login(): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(LOGIN, {email: 'valya@mail.com', password:'1Aa@23456'}, {observe: 'response'}).
    pipe(catchError(this.handleError))
    
  }

  logout(): void {  
    this.isLoggedIn = false;
  }

  private handleError = (error: HttpErrorResponse) => {
    this.snakbarService.openSnackBar(error.error.message);
    return throwError(() => error.message);
  }

}

