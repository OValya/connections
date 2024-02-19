import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {Group, GroupMessage, GroupMessageWithName, Message, Profile} from 'src/app/models/profile.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable, map, combineLatest} from 'rxjs';
import {
  selectAllGroups,
  selectAllPeople,
  selectMessagesByGroupId
} from 'src/app/store/selectors/connection.selectors';
import {deleteGroup, addMessageToGroup, loadGroupById} from '../../../store/actions/connection-api.actions'
import {setActiveChatId} from "../../../store/actions/connection.actions";
import {selectUser, selectUserID} from "../../../store/selectors/user.selectors";
import {group} from "@angular/animations";
import {DeleteModalComponent} from "../../components/delete-modal/delete-modal.component";
import * as ConnectionAPIActions from "../../../store/actions/connection-api.actions";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, RouterModule, MatDialogModule ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss'
})
export class GroupDialogComponent implements OnInit {
  messages$:Observable<GroupMessage[]>;
  namedMessage$:Observable<GroupMessageWithName[]>;
  messages:GroupMessage[];
  groups$: Observable<Group[]>;
  userGroup$: Observable<Group|undefined>;
  since:string = '';
  users$: Observable<Profile[]>;
  @Input() text: string = '';
  @Output() newText = new EventEmitter<string>()
  userId$: Observable<string>;
  private groupID: string;

  constructor(private router:Router, private store:Store, private  route: ActivatedRoute, public dialog:MatDialog,){
    this.groupID = this.route.snapshot.params['id'] //this.store.select(selectActiveGroupID)//  //select
    this.store.dispatch(setActiveChatId({groupID:this.groupID}))
    this.store.dispatch(loadGroupById({groupID:this.groupID}))
  }

  ngOnInit(){

    this.messages$ = this.store.select(selectMessagesByGroupId);
    this.users$ = this.store.select(selectAllPeople)
    this.userId$ = this.store.select(selectUserID)
    this.groups$ = this.store.select(selectAllGroups)

    this.userGroup$ = combineLatest( [this.groups$, this.userId$]).pipe(
      map(([gr, id])=>
      gr.filter(g=> g.createdBy.S==id).find(g=>g.id.S==this.groupID)))


    this.namedMessage$ = combineLatest([this.messages$, this.users$]).pipe(
      map(([messages, users])=> {
        const res:GroupMessageWithName[] = [];
        if(messages) messages.slice().sort((a, b)=>+a.createdAt.S - +b.createdAt.S).map(m=> {
          const profile = users.find(user => user.uid.S==m.authorID.S)
          const name = profile ? profile.name.S : 'Deleted'
          res.push({message:m, authorName:name, authorId:profile!.uid.S});
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
  }

  update(){
    this.store.dispatch(loadGroupById({groupID:this.groupID, since:this.since}))
  }
  deleteGroup(){
    const dialogRef = this.dialog.open(DeleteModalComponent, {disableClose:true})
    dialogRef.afterClosed().subscribe(data =>
      {if(data) this.store.dispatch(ConnectionAPIActions.deleteGroup({id:this.groupID}))}
    )
    this.router.navigate(['/'])
  }

  sendMessage(message:string){
      this.store.dispatch(addMessageToGroup({groupID:this.groupID, message, since:this.since}))
  }


  protected readonly group = group;
}
