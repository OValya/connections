import { Directive } from '@angular/core';
import { AbstractControl, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  standalone: true
})

  export class passwordValidator implements Validator {

  validate(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.match(/[!@#?]/)) return { extra: true };
    if (!control.value.match(/[0-9]/)) return { number: true };
    if (!control.value.match(/[A-Z]/)) return { upper: true };
    if (!control.value.match(/[a-z]/)) return { lower: true };
    return null;
  }
}

