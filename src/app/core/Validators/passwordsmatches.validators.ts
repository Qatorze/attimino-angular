import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Questa funzione permette di invalidare il form se password e confirmPassword non coincidono.
export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
