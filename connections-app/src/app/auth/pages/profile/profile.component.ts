import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Profile } from 'src/app/models/profile.model';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import {getProfile, updateProfile} from 'src/app/store/actions/user.actions'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements  OnInit{
  readable: boolean = false;
  userName:string;
  profile$:Observable<Profile|null>
  name:FormControl<string|null>

  constructor(private snackBar:SnackBarService, private authService:AuthService, private store:Store){
    this.profile$=this.store.select(selectUser);
    this.profile$.subscribe(profile => {
      this.userName = profile?.name.S!;
      this.name = new FormControl(this.userName, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]*$/)])
    })
  }

  ngOnInit(): void {
    this.getProfile();  
  }

  getProfile(){
    this.profile$.subscribe((data)=>{
      if(!data) this.store.dispatch(getProfile());
    })
  }


  

  editProfile(){
    this.readable = true;
  }

  save(){
    //this.snackBar.openSnackBar(`New name ${this.name.value} save to your profile!`)
   // this.profile.name = this.name.value!;
    this.store.dispatch(updateProfile({name:this.name.value!}))
    this.readable=false;
  }

  cancel(){
    //this.name.setValue({s:''});
    this.readable=false;
  }

  logout(){
    this.authService.logout();
  }

}
