import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { getProfile, login, loginError, logout, setProfile, setToken, updateNameProfile, updateProfile } from "../actions/user.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class LoginEffects {

    constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          map(({ body}) => setToken({ token:body?.token! })),
          catchError(() => of(loginError({ message: "Login failed" })))
        );
      })
    );
  });
  

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.router.navigateByUrl("/login");
        })
      );
    },
    
  );


  profile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProfile),
      mergeMap(() => {
        return this.authService.getProfile().pipe(
          map(({body}) => setProfile({profile:body!}))
        );
      })
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProfile),
      mergeMap(({name})=>{
        return this.authService.updateProfile(name).pipe(
          map(()=> updateNameProfile({name}))
        )
      })

    )
  })
}


