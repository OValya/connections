import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Profile } from 'src/app/models/profile.model';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readable: boolean = false;

  profile:Profile = {
    createdAt: '25/05/23',
    email: 'valys@dffs',
    name: 'valys',
    uid:'sdfdsf55465'
  }

  constructor(private snackBar:SnackBarService){

  }

  name = new FormControl(this.profile.name, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]*$/)])

  editProfile(){
    this.readable = true;
  }

  save(){
    this.snackBar.openSnackBar(`New name ${this.name.value} save to your profile!`)
    this.profile.name = this.name.value!;
    this.readable=false;
  }

  cancel(){
    this.name.setValue('');
    this.readable=false;
  }

}
