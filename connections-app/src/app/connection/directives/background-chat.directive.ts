import { Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';

@Directive({
  selector: '[appBackgroundChat]',
  standalone: true
})
export class BackgroundChatDirective {
  people$:Observable<Profile[]>;
 // chats$:Observable<

  constructor(private store:Store) { 

  }

}
