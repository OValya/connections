import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Group } from 'src/app/models/profile.model';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, MatListModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  groups: Group[] = [
    {
      name: 'Group1',
      createdAt: '2/20/16'
    },
    {
      name: 'Group2',
      createdAt: '1/18/16'
    },
  ];

   people: {name:string, chatId?:string}[] = [
     {name: 'Igor',
      chatId: '123',},
     {name: 'Valya',
      chatId: '1',},
     {name: 'Ilya',
      chatId: '3',},
     {name: 'mama'},    
  ];

}
