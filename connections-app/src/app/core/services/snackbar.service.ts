import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(message: string){
    this.snackbar.open(message, 'I got it!')
  }
}
