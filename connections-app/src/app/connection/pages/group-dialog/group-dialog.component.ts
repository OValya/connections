import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {GroupMessage, GroupMessageWithName, Message, Profile} from 'src/app/models/profile.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable, map, tap, combineLatestAll, combineLatest} from 'rxjs';
import {selectAllPeople, selectMessagesByGroupId} from 'src/app/store/selectors/connection.selectors';
import {loadGroupById} from '../../../store/actions/connection-api.actions'
import {setActiveChatId} from "../../../store/actions/connection.actions";
import {selectUser} from "../../../store/selectors/user.selectors";
@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, RouterModule ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss'
})
export class GroupDialogComponent implements OnInit {
  groupID:string;
  messages$:Observable<GroupMessage[]>;
  namedMessage$:Observable<GroupMessageWithName[]>;
  messages:GroupMessage[];
  users$: Observable<Profile[]>;
  constructor(private route:ActivatedRoute, private store:Store){
    //this.groupID = this.route.snapshot.params['id']  //select
    this.messages$ = this.store.select(selectMessagesByGroupId);
    this.users$ = this.store.select(selectAllPeople)
    // this.namedMessage$ = combineLatest([this.messages$, this.users$]).pipe(
    //   map(([messages, users])=> {
    //     const res:GroupMessageWithName[] = [];
    //     messages.map(m=> {
    //       const profile = users.find(user => user.uid==m.authorID)
    //       const name = profile ? profile.name.S : 'Deleted'
    //       res.push({message:m, authorName:name});
    //
    //     });
    //     return res
    //   })
    // )

    // .pipe(
    //   tap((items)=>console.log('items', items)),
    //   map((items)=> items? items.slice().sort((a, b) => +a.createdAt.S - +b.createdAt.S):[]),
    // )
  }

  ngOnInit(){
    this.messages$.subscribe(
      (items)=> this.messages =
        items? items.slice().sort((a, b) => +a.createdAt.S - +b.createdAt.S):[]
    )

    this.namedMessage$ = combineLatest([this.messages$, this.users$]).pipe(
      map(([messages, users])=> {
        const res:GroupMessageWithName[] = [];
        if(messages) messages.slice().sort((a, b)=>+a.createdAt.S - +b.createdAt.S).map(m=> {
          const profile = users.find(user => user.uid.S==m.authorID.S)
          const name = profile ? profile.name.S : 'Deleted'
          res.push({message:m, authorName:name});
        });
        return res
      })
    )



    this.namedMessage$.subscribe(items => console.log(items))

    //this.store.dispatch(setActiveChatId({groupID:this.groupID}))
    //this.store.dispatch(loadGroupById({groupID:this.groupID}))
    // this.messages$ = this.store.select(selectMessagesByGroupId)
    //   .pipe(
    //     tap((items)=>console.log('items', items)),
    //     map((items)=> items.slice().sort((a, b) => +a.createdAt.S - +b.createdAt.S)),
    //   )

  }


}
