import { Component } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { Message } from 'src/app/models/profile.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, RouterModule ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss'
})
export class GroupDialogComponent {
  constructor(){

  }
  messages: Message[] = [
    {authorID:'123',
     message:'hello',
    createdAt:'05/03/2023'},
    {authorID:'122',
     message:'hello all',
    createdAt:'05/03/2023'},
    {authorID:'124',
     message:'привет',
    createdAt:'05/03/2023'},
    {authorID:'123',
     message:'как дела?',
    createdAt:'05/03/2023'},
    {authorID:'122',
     message:'норм',
    createdAt:'05/03/2023'},


  ]
}
