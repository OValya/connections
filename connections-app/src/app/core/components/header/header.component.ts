import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  login:boolean;
  
  constructor(private router:Router, private service:AuthService){
    this.service.isLoggedin$.subscribe((value)=>this.login=value);
  }


  openProfile(){
    this.service.openProfile().subscribe((value)=>console.log('profile', value))
    
  }

}
