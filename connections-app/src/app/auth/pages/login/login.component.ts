import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import strongPassword from '../../common/password.validator';
import {RouterModule} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   constructor( private service: AuthService){

   }

   loginForm = new FormGroup(
    {
    email : new FormControl('', [Validators.required, Validators.email]),
   
    password: new FormControl('', [Validators.required, Validators.minLength(8), strongPassword])
  }

  )

  get password() {
    return this.loginForm.get('password')!;
  }
  get email() {
    return this.loginForm.get('email')!;
  }

  onSubmit(){
    this.service.login().subscribe(res => console.log('res', res))
    console.log('form', this.loginForm.value)
  }
}
