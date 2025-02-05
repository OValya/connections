import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, catchError, map, tap, throwError, mergeMap} from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import {
  DELETE_GROUP,
  GROUPS,
  GROUP_CHAT,
  NEW_GROUP,
  PEOPLE,
  SEND_MESSAGE_GROUP_CHAT, CONVERSATIONS, NEW_CONVERSATION
} from 'src/app/endpoints/endpoints';
import {
  Group,
  GroupList,
  GroupMessageList,
  PeopleList,
  PrivateChat,
  PrivateChatList, PrivateChatListDTO,
  Profile
} from 'src/app/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http:HttpClient, private snackbarService:SnackBarService) { }

  all():Observable<HttpResponse<GroupList>>{
    return this.http.get<GroupList>(GROUPS, {observe:'response'}).pipe(
      catchError(this.handleError),
      tap(()=> this.snackbarService.openSnackBar(`Loading all groups is success!`))
    )
  }
  loadGroupChatById(id:string, since?:string):Observable<HttpResponse<GroupMessageList>>{
    let param = new HttpParams().set('groupID', id);
    if(since) param = param.set('since', since);
    return this.http.get<GroupMessageList>(GROUP_CHAT, {params:param, observe:"response"} ).pipe(
      catchError(this.handleError),
      tap(()=> this.snackbarService.openSnackBar(`Loading message for group ${id} is success!`))
    )
  }

  sendMessageToGroup(message:string, groupID:string):Observable<HttpResponse<{}>>{
    return this.http.post(SEND_MESSAGE_GROUP_CHAT, {message, groupID}, {observe:'response'}).pipe(
      catchError(this.handleError),
      tap(()=> this.snackbarService.openSnackBar('Your message is send')),
    )
  }

  add(name:string):Observable<HttpResponse<{groupID:string}>>{
    return this.http.post<{groupID:string}>(NEW_GROUP, {name}, {observe:'response'}).pipe(
      catchError(this.handleError),
      tap(()=> this.snackbarService.openSnackBar(`Addition group is success!`))
    )
  }

  delete(id:string):Observable<HttpResponse<{}>>{
    const options = {params: new HttpParams().set('groupID', id) };
    return this.http.delete(DELETE_GROUP, {...options, observe:"response"}).pipe(
      catchError(this.handleError),
      tap(()=> this.snackbarService.openSnackBar(`Removing group is success!`))
    )
  }

  loadPeople():Observable<HttpResponse<PeopleList>>{
    return this.http.get<PeopleList>(PEOPLE, {observe:'response'}).pipe(
      catchError(this.handleError),
      tap(()=> this.snackbarService.openSnackBar(`Loading people is success!`)))
  }

  loadConverstions():Observable<PrivateChatList>{
    return this.http.get<PrivateChatListDTO>(CONVERSATIONS, {observe:'response'}).pipe(
      catchError(this.handleError),
      map(({body})=> {return {Items:this.transformData(body!), Count:body!.Count}}),
      tap(()=>this.snackbarService.openSnackBar('loading conversations is success'))
    )
  }

  private transformData(data:PrivateChatListDTO):PrivateChat[]{
    const transformedItems:PrivateChat[]=[]
    data.Items.map(it => {
      transformedItems.push({id: it.id.S, companionID:it.companionID.S})
    })
    return  transformedItems
  }

  createConversation(companion:string):Observable<HttpResponse<{conversationID: string}>>{
    return this.http.post<{conversationID: string}>(NEW_CONVERSATION, {companion}, {observe:'response'} ).pipe(
      catchError(this.handleError),
      tap(()=>this.snackbarService.openSnackBar('creation is succeed'))
    )
  }



  private handleError = (error: HttpErrorResponse) => {
    this.snackbarService.openSnackBar(error.error.message);
    return throwError(() => error.message);
  }


}
