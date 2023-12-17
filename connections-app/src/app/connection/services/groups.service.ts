import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { GROUPS, GROUP_CHAT } from 'src/app/endpoints/endpoints';
import { GroupList, GroupMessageList } from 'src/app/models/profile.model';

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

}
