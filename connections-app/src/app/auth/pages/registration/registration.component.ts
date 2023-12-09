import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import strongPassword from '../../common/password.validator';

import { Profile } from 'src/app/models/profile.model';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm = new FormGroup(
    {
    email : new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), strongPassword])
  }

  )

  get name() {
    return this.registrationForm.get('name')!;
  }
  get password() {
    return this.registrationForm.get('password')!;
  }
  get email() {
    return this.registrationForm.get('email')!;
  }

  onSubmit(){
    console.log('form', this.registrationForm.value)
  }

}
