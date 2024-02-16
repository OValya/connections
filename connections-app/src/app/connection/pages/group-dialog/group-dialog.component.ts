import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {GroupMessage, GroupMessageWithName, Message, Profile} from 'src/app/models/profile.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable, map, tap, combineLatestAll, combineLatest} from 'rxjs';
import {
  selectActiveGroupID,
  selectAllPeople,
  selectMessagesByGroupId
} from 'src/app/store/selectors/connection.selectors';
import {deleteGroup, addMessageToGroup, loadGroupById} from '../../../store/actions/connection-api.actions'
import {setActiveChatId} from "../../../store/actions/connection.actions";
import {selectUser, selectUserID} from "../../../store/selectors/user.selectors";
@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, RouterModule ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss'
})
export class GroupDialogComponent implements OnInit {
  groupID$:Observable<string>;
  messages$:Observable<GroupMessage[]>;
  namedMessage$:Observable<GroupMessageWithName[]>;
  messages:GroupMessage[];
  since:string = '';
  users$: Observable<Profile[]>;
  @Input() text: string = '';
  @Output() newText = new EventEmitter<string>()
  userId$: Observable<string>;
  private groupID: string;
  constructor(private router:Router, private store:Store, private  route: ActivatedRoute){
    this.groupID = this.route.snapshot.params['id'] //this.store.select(selectActiveGroupID)//  //select
    this.store.dispatch(setActiveChatId({groupID:this.groupID}))
    this.store.dispatch(loadGroupById({groupID:this.groupID}))


  }

  ngOnInit(){

    this.messages$ = this.store.select(selectMessagesByGroupId);
    this.users$ = this.store.select(selectAllPeople)
    this.userId$ = this.store.select(selectUserID)

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

    this.namedMessage$.subscribe(messages => {
        if (messages.length != 0) {
          this.since = messages[messages.length - 1].message.createdAt.S
        }
      }
    )





   // this.namedMessage$.subscribe(items => console.log(items))

    //this.store.dispatch(setActiveChatId({groupID:this.groupID}))
    //this.store.dispatch(loadGroupById({groupID:this.groupID}))
    // this.messages$ = this.store.select(selectMessagesByGroupId)
    //   .pipe(
    //     tap((items)=>console.log('items', items)),
    //     map((items)=> items.slice().sort((a, b) => +a.createdAt.S - +b.createdAt.S)),
    //   )

  }

  update(){
    this.store.dispatch(loadGroupById({groupID:this.groupID, since:this.since}))
  }
  deleteGroup(){
    this.groupID$.subscribe(groupId => this.store.dispatch(deleteGroup({id:groupId})))
    this.router.navigate(['/'])
  }

  sendMessage(message:string){
   // this.groupID$.subscribe(groupID =>
      this.store.dispatch(addMessageToGroup({groupID:this.groupID, message, since:this.since}))//);
      //this.store.dispatch(loadGroupById({groupID:this.groupID, since:this.since}))

  }


}
