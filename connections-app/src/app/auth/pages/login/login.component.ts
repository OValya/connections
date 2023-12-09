import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import strongPassword from '../../common/password.validator';
import {RouterModule} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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
    console.log('form', this.loginForm.value)
  }
}
