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
         // tap(({body})=>console.log('tap load group', body?.Items! )),
          map(({body})=> ConnectionActions.loadGroupList({groups:body?.Items!}))
        )
      })

    )
  })

  loadGroupMessages$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.loadGroupById),
      mergeMap(({groupID})=>{
        return this.groupService.loadGroupChatById(groupID).pipe(
        //  tap(({body})=>console.log('tap load messages', body?.Items! )),
          map(({body})=> ConnectionActions.loadGroupById({messages:body?.Items!, groupID}))
        )
      })

    )
  })

  sendMessageToGroup$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.addMessageToGroup),
      mergeMap(({message, groupID, since})=> {
        return this.groupService.sendMessageToGroup(message, groupID).pipe(
          map(()=> ConnectionActions.addMessageToGroup({message, groupID, since}))
          //todo сделать обработку ошибок
        )
      })
    )
  })

  addMessagetoList = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionActions.addMessageToGroup),
      mergeMap(({message, groupID, since})=>{
        return this.groupService.loadGroupChatById(groupID, since).pipe(
          //  tap(({body})=>console.log('tap load messages', body?.Items! )),
          map(({body})=> ConnectionActions.loadGroupById({messages:body?.Items!, groupID}))
        )
      })
    )
  })

   addGroup$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.addGroup),
      mergeMap(({nameGroup, id})=>{
        return this.groupService.add(nameGroup).pipe(
         // tap(({body})=>console.log('tap load group', body?.groupID )),
          map(({body})=> ConnectionActions.addGroup({group:{
            id:{S:body?.groupID!},
            name:{S:nameGroup},
            createdAt:{S:(Date.now).toString()},
            createdBy:{S:id}}}))
        )
      })
    )
  })

  deleteGroup$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.deleteGroup),
      mergeMap(({id})=>{
        return this.groupService.delete(id).pipe(

          map(()=> ConnectionActions.deleteGroup({id}))
        )
      })
    )
  })


  loadPeople$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ConnectionAPIActions.loadPeopleList),
      mergeMap(()=>{
        return this.groupService.loadPeople().pipe(
          //tap(({body})=>console.log('tap load group', body?.Items )),
          map(({body})=> ConnectionActions.loadPeopleList({people:body?.Items!}))
        )
      })

    )
  })


}
