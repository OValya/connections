import { FormControl } from "@angular/forms";

export default function strongPassword(control:FormControl):{ [n:string]:true } | null {
    if (!control.value.match(/[!@#?]/) || 
        !control.value.match(/[0-9]/)  ||
        !control.value.match(/[A-Z]/)  ||
        !control.value.match(/[a-z]/)) return { strong: true };

    // if (!control.value.match(/[!@#?]/)) return { extra: true };
    // if (!control.value.match(/[0-9]/)) return { number: true };
    // if (!control.value.match(/[A-Z]/)) return { upper: true };
    // if (!control.value.match(/[a-z]/)) return { lower: true };

    return null;
  }