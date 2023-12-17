import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { LOGIN, PROFILE, REGISTRATION } from 'src/app/endpoints/endpoints';
import { Profile } from 'src/app/models/profile.model';

interface AuthResponse {
  token: string;
  uid: string
}


@Injectable()
export class AuthService {
  isLoggedIn:boolean;
  isLoggedin$: BehaviorSubject<boolean>;
  
  
  constructor(private http:HttpClient, private snakbarService:SnackBarService, private router:Router) {
    this.isLoggedIn=localStorage.getItem('token')?true:false;
    this.isLoggedin$ = new BehaviorSubject(this.isLoggedIn);
   }


  registration(name:string, email:string, password:string):Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(REGISTRATION, {email, name, password}, {observe: 'response', headers:{skip:"true"}}).
    pipe(catchError(this.handleError),
           tap(()=>{this.snakbarService.openSnackBar('Success!'); 
                    this.router.navigate(['/signin'])}
            ))
  }

  login(email:string, password:string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(LOGIN, {email, password}, {observe: 'response', headers:{skip:"true"}}).
    pipe(catchError(this.handleError),
         tap(({body})=>{this.isLoggedIn=true;
                  this.isLoggedin$.next(true);
                  localStorage.setItem('email', email);
                  localStorage.setItem('token', body?.token!);
                  localStorage.setItem('uid', body?.uid!);
                  this.router.navigate(['/']);
                 
                  this.snakbarService.openSnackBar('Success!'); 
                  }
            )
        )
  }

  logout(): void {  
    this.isLoggedIn = false;
    this.isLoggedin$.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    this.router.navigate(['/']);
  }

  getAuthorization(){
    const uid =localStorage.getItem('uid')!;
    const token =localStorage.getItem('token')!;
    const email =localStorage.getItem('email')!;
    return {uid, token, email}
  }

  getProfile():Observable<HttpResponse<Profile>>{
    return this.http.get<Profile>(PROFILE, {observe: 'response'}).
      pipe(catchError(this.handleError),
           tap(()=>{this.snakbarService.openSnackBar('Access is allowed!'); 
                    this.router.navigate(['/profile'])}
            ),
      )
  }

  updateProfile(name:string):Observable<HttpResponse<Profile>>{
    return this.http.put<Profile>(PROFILE, {name}, {observe: 'response'}).
      pipe(
      catchError(this.handleError),
      tap(()=> this.snakbarService.openSnackBar(`Profile is update with ${name}`)))
  }
  
  
  
  private handleError = (error: HttpErrorResponse) => {
    this.snakbarService.openSnackBar(error.error.message);  
    return throwError(() => error.message);
  }

}

