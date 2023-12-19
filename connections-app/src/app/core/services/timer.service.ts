import { Injectable } from '@angular/core';
import { Observable, timer, map, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timer$:Observable<number>

  constructor() { }

  startTimer(){
    this.timer$ = timer(0, 1000).pipe(
      map(n => (60 - n)),
      takeWhile(n => n >= 0),
    );
  }

  getTimer(){
    return this.timer$
  }
}
