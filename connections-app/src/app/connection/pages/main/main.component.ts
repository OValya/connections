import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Group, GroupList, PeopleList, Profile } from 'src/app/models/profile.model';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { routes } from 'src/app/app.routes';
import { Router, RouterModule } from '@angular/router';
import { GroupsService } from '../../services/groups.service';
import { Observable, timer, map, takeWhile } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ConnectionActions from "../../../store/actions/connection.actions";
import * as ConnectionAPIActions from "../../../store/actions/connection-api.actions";
import {
  selectAllGroups,
  selectAllPeople,
  selectGroupTimer,
  selectMessagesByGroupId
} from 'src/app/store/selectors/connection.selectors';
import { TimerService } from 'src/app/core/services/timer.service';
import { selectUserID } from 'src/app/store/selectors/user.selectors';
import { setProfileID } from 'src/app/store/actions/user.actions';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import {loadGroupById} from "../../../store/actions/connection-api.actions";
import {setGroupTimer} from "../../../store/actions/connection.actions";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, MatListModule, MatButtonModule, MatDialogModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  groups$: Observable<Group[]>;
  people$: Observable<Profile[]>;
 // groups: GroupList;

  timer$: Observable<number>
  timer: number;

  userID$: Observable<string>;
  uid:string;

  nameGroup!:string;
  isSetTimer$: Observable<number>;

  constructor(public dialog:MatDialog,
    private timerService:TimerService,
    private groupService: GroupsService,
    private router:Router,
    private store:Store){
      this.groups$ = this.store.select(selectAllGroups);
      this.people$ = this.store.select(selectAllPeople);
      this.userID$ = this.store.select(selectUserID);
      this.isSetTimer$ = this.store.select(selectGroupTimer)
  }

  ngOnInit(): void {

     this.groups$.subscribe((data)=>{
      if(data.length===0) this.store.dispatch(ConnectionAPIActions.loadGroupList());
   })

    this.people$.subscribe((data)=>{
      if(data.length===0) this.store.dispatch(ConnectionAPIActions.loadPeopleList());
   })



   //todo create service?? for save data to store??
     this.uid = localStorage.getItem('uid')!
     this.store.dispatch(setProfileID({id:this.uid}))

  }




  updateGroup(){ //todo disable button
   // this.store.dispatch(ConnectionAPIActions.loadGroupList());
    this.timerService.startTimer();
    this.timer$ = this.timerService.getTimer()
    this.store.dispatch(setGroupTimer({timer:1}))
    this.timer$.subscribe(time => {this.timer = time; console.log('timer', this.timer)})
  }


  openDialog(){
     const dialogConfig = new MatDialogConfig<{name:string}>();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = {
       name: ''
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data =>
      {if(data) this.store.dispatch(ConnectionAPIActions.addGroup({nameGroup:data, id:this.uid}))   }
     )
  }

  deleteGroup(id:string, e:Event){
    e.stopPropagation();
    const dialogRef = this.dialog.open(DeleteModalComponent, {disableClose:true})
    dialogRef.afterClosed().subscribe(data =>
      {if(data) this.store.dispatch(ConnectionAPIActions.deleteGroup({id}))}
    )
  }

  selectGroupChat(groupID:string){
    // this.store.dispatch(ConnectionActions.setActiveChatId({groupID}))
    // this.store.dispatch(ConnectionAPIActions.loadGroupById({groupID}))
    this.router.navigate(['group', groupID]);
  }

  selectUserForChat(){
    this.store.dispatch(ConnectionAPIActions.loadConversations())
    const conversationID = '111'
    //this.router.navigate((['conversation', conversationID]))
  }

}
