import { AbstractControl, ValidatorFn } from '@angular/forms';

// Questa funzione permette di invalidare il form se l'email non è come descritta dalla regex
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(control.value)) {
      return { emailInvalid: true };
    }
    return null;
  };
}
