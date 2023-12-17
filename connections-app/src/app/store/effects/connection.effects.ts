import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoadingService } from "src/app/core/services/loading.service";
import * as ConnectionActions from "../actions/connection.actions";
import * as ConnectionAPIActions from "../actions/connection-api.actions";
import { GroupsService } from "src/app/connection/services/groups.service";
import { map, mergeMap, tap } from "rxjs";

@Injectable()
export class ConnectionEffects {

    constructor(
    private readonly actions$: Actions,
    private readonly loadingService: LoadingService,
    private readonly groupService: GroupsService,
    private readonly router: Router,
  ) {}

  loadGroups$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.loadGroupList),
      mergeMap(()=>{
        return this.groupService.all().pipe(
          tap(({body})=>console.log('tap load group', body?.Items! )),
          map(({body})=> ConnectionActions.loadGroupList({groups:body?.Items!}))
        )
      })

    )
  })

  loadGroupMessages$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.loadGroupById),
      mergeMap(({id})=>{
        return this.groupService.loadGroupChatById(id).pipe(
          tap(({body})=>console.log('tap load messages', body?.Items! )),
          map(({body})=> ConnectionActions.loadGroupById({messages:body?.Items!}))
        )
      })

    )
  })

    
}