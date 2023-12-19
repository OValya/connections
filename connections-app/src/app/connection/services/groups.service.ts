import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { DELETE_GROUP, GROUPS, GROUP_CHAT, NEW_GROUP, PEOPLE } from 'src/app/endpoints/endpoints';
import { Group, GroupList, GroupMessageList, PeopleList, Profile } from 'src/app/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http:HttpClient) { }

  all():Observable<HttpResponse<GroupList>>{
    return this.http.get<GroupList>(GROUPS, {observe:'response'}).pipe(
      tap(res => console.log('res', res))
    )
  }
  loadGroupChatById(id:string, since?:string):Observable<HttpResponse<GroupMessageList>>{
    const options = {params: new HttpParams().set('groupID', id) };
    return this.http.get<GroupMessageList>(GROUP_CHAT, {...options, observe:"response"} ).pipe(
      tap(res => console.log('res', res))
    )
  }

  add(name:string):Observable<HttpResponse<{groupID:string}>>{
    return this.http.post<{groupID:string}>(NEW_GROUP, {name}, {observe:'response'}).pipe(
      tap(res => console.log('create res', res))
    )
  }

  delete(id:string):Observable<HttpResponse<{}>>{
    const options = {params: new HttpParams().set('groupID', id) };
    return this.http.delete(DELETE_GROUP, {...options, observe:"response"}).pipe(
      tap(res => console.log('delete res', res))
    )
  }

  loadPeople():Observable<HttpResponse<PeopleList>>{
    return this.http.get<PeopleList>(PEOPLE, {observe:'response'}).pipe(
      tap(res => console.log('load people', res))
    )
  }

}
