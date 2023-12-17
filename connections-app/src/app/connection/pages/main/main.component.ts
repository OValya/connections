import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Group, GroupList } from 'src/app/models/profile.model';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { routes } from 'src/app/app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
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

  constructor(public dialog:MatDialog, private service: AuthService, private router:Router){}


  openGroup(){
    this.router.navigate(['group/1'])
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
