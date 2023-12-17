import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { GroupMessage, Message } from 'src/app/models/profile.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMessagesByGroupId } from 'src/app/store/selectors/connection.selectors';
import {loadGroupById} from '../../../store/actions/connection-api.actions'
@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, RouterModule ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss'
})
export class GroupDialogComponent implements OnInit {
  id:string;
  messages$:Observable<GroupMessage[]>;
  constructor(private route:ActivatedRoute, private store:Store){
    this.id = this.route.snapshot.params['id']
    this.messages$ = this.store.select(selectMessagesByGroupId)
  }

  ngOnInit(){
    this.store.dispatch(loadGroupById({id:this.id}))

  }

  
}
