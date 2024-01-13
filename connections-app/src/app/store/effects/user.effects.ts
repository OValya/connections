import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {catchError, EMPTY, empty, exhaustMap, map, mergeMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { getProfile, login, loginError, logout, setLoading, setProfile, setToken, updateNameProfile, updateProfile } from "../actions/user.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoadingService } from "src/app/core/services/loading.service";
import {Store} from "@ngrx/store";
import {selectLoaded} from "../selectors/user.selectors";

@Injectable()
export class LoginEffects {

    constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private store: Store,
    private readonly loadingService: LoadingService,
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
      withLatestFrom(this.store.select(selectLoaded)),
      switchMap(([,loaded])=>{
        if (loaded) {
          return EMPTY;
        }

        return this.authService.getProfile().pipe(
          map(({body}) => setProfile({profile:body!}))


      // mergeMap(() => {
      //   return this.authService.getProfile().pipe(
      //     map(({body}) => setProfile({profile:body!}))
      //   );
      // })
        );
      })
    )
  })

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProfile),
      //tap(()=>setLoading({loading:true})),
      tap(()=>this.loadingService.startEdit()),
      exhaustMap(({name})=>{
        return this.authService.updateProfile(name).pipe(
         // tap(()=>)
          map(()=> updateNameProfile({name})),
          tap(()=>{this.loadingService.finishLoading();this.loadingService.finishEdit()})
        )
      })

    )
  })
}


