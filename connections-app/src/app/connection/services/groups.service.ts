import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { GROUPS } from 'src/app/endpoints/endpoints';
import { GroupList } from 'src/app/models/profile.model';

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

}
