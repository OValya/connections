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
import { selectLoading, selectUser } from 'src/app/store/selectors/user.selectors';
import {getProfile, setLoading, updateProfile} from 'src/app/store/actions/user.actions'
import { LoadingService } from 'src/app/core/services/loading.service';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements  OnInit{
  editable$: Observable<boolean>;
  loading$: Observable<boolean>;
  userName:string;
  profile$:Observable<Profile|null>
  name:FormControl<string|null>

  constructor(private loadingService:LoadingService, private authService:AuthService, private store:Store){
    this.profile$=this.store.select(selectUser);
    //this.loading$=this.store.select(selectLoading);
    this.loading$=this.loadingService.isLoading$;
    this.editable$=this.loadingService.isEditable$;
    this.profile$.subscribe(profile => {
      this.userName = profile?.name.S || '';
      //console.log('username', this.userName)
      //this.name = new FormControl(this.userName, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]*$/)])
    })
  }

  ngOnInit(): void {
    this.getProfile();  
  }

  getProfile(){
    this.profile$.subscribe((data)=>{
      if(!data?.email) this.store.dispatch(getProfile());
    })
  }

  editProfile(){
    this.loadingService.startEdit();
    this.name = new FormControl(this.userName, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]*$/)])
  }

  save(){
    this.loadingService.startLoading();
    this.store.dispatch(updateProfile({name:this.name.value!}))
  }

  cancel(){
    this.name.setValue(this.userName);
    
    this.loadingService.finishEdit();
  }

  logout(){
    this.authService.logout();
  }

}
