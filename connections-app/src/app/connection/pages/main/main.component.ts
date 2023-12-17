import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Group, GroupList, PeopleList } from 'src/app/models/profile.model';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { routes } from 'src/app/app.routes';
import { Router, RouterModule } from '@angular/router';
import { GroupsService } from '../../services/groups.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ConnectionActions from "../../../store/actions/connection.actions";
import * as ConnectionAPIActions from "../../../store/actions/connection-api.actions";
import { selectAllGroups } from 'src/app/store/selectors/connection.selectors';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, MatListModule, MatButtonModule, MatDialogModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  groups$: Observable<Group[]>;
  people$: Observable<PeopleList>;
  groups: GroupList;
  //  = [
  //   {
  //     name: 'Group1',
  //     createdAt: '2/20/16'
  //   },
  //   {
  //     name: 'Group2',
  //     createdAt: '1/18/16'
  //   },
  // ];

   people: {name:string, chatId?:string}[] = [
     {name: 'Igor',
      chatId: '123',},
     {name: 'Valya',
      chatId: '1',},
     {name: 'Ilya',
      chatId: '3',},
     {name: 'mama'},    
  ];

  nameGroup!:string;

  constructor(public dialog:MatDialog, private groupService: GroupsService, private router:Router, private store:Store){
      this.groups$ = this.store.select(selectAllGroups)  
  }

  ngOnInit(): void {
     this.groups$.subscribe((data)=>{
      if(data.length===0) this.store.dispatch(ConnectionAPIActions.loadGroupList());
   })
  }

 


  updateGroup(){
    this.store.dispatch(ConnectionAPIActions.loadGroupList());

    //this.router.navigate(['group/1'])

  }


  openDialog(){
     const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;

     dialogConfig.data = {
       name: ''
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    //  dialogRef.afterClosed().subscribe(
    //     data => this.groups.push({name:data, createdAt:{S:'05/05/2023'}})
    // );    
  }

}
