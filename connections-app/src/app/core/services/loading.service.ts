import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  isLoading$:BehaviorSubject<boolean>
  isEditable$:BehaviorSubject<boolean>
    
  constructor() { 
    this.isLoading$= new BehaviorSubject(false)
    this.isEditable$= new BehaviorSubject(false)
  }

  startLoading(){
    this.isLoading$.next(true);
  }

  finishLoading(){
    this.isLoading$.next(false);
  }

  startEdit(){
    this.isEditable$.next(true)
  }

  finishEdit(){
    this.isEditable$.next(false)
  }



  
}
