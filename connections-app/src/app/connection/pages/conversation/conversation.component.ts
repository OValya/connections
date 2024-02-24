import { Component } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {GroupMessage, Message} from 'src/app/models/profile.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as ConnectionAPIAction from '../../../store/actions/connection-api.actions'
import {selectMessagesByGroupId} from "../../../store/selectors/connection.selectors";

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {
   messages$:Observable<GroupMessage[]> //= this.store.select(selectMessagesByGroupId)
  //
  // constructor(
  //   private store:Store
  // ) {
  //
  // }

  update(){

  }

  delete(){

  }

  send(){

  }





}
