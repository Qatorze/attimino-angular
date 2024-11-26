import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorHandlerService } from '../../../core/services/form-error-handler.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { emailValidator } from '../../../core/Validators/email.validator';
import { passwordMatchValidator } from '../../../core/Validators/passwordsmatches.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;

  //Qui un oggetto per la mia gestione degli errori legati al mio formulario.
  public formErrors: {
    [campo: string]: {
      message: string;
      validations: { [field: string]: string };
    };
  } = {
    name: {
      message: '',
      validations: {
        minlength: 'Il nome deve avere almeno 3 lettere.',
        required: 'Il nome è obbligatorio.',
        pattern:
          "Il nome non puo' contenere spazi finali o caratteri speciali.",
      },
    },
    surname: {
      message: '',
      validations: {
        minlength: 'Il cognome deve avere almeno 3 lettere.',
        required: 'Il cognome è obbligatorio.',
        pattern:
          "Il cognome non puo' contenere spazi finali o caratteri speciali.",
      },
    },
    email: {
      message: '',
      validations: {
        emailInvalid: "Inserisci un'email valida.",
        required: "L'email è obbligatoria.",
      },
    },
    password: {
      message: '',
      validations: {
        pattern:
          'La password deve essere di almeno 8 caratteri e contenere almeno una lettera, un numero e un carattere speciale tra: ! @ # $ % ^ & * ( ) _ + - = [ ] { } ; \' : "  | , . < > / ?.',
        required: 'La password è obbligatoria.',
      },
    },
    confirmPassword: {
      message: '',
      validations: {
        notMatch: 'Le password non coincidono.',
        required: 'La conferma della password è obbligatoria.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(
    private formErrorHandler: FormErrorHandlerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}( [a-zA-ZÀ-ÖØ-öø-ÿ]{3,})*$/
          ),
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}( [a-zA-ZÀ-ÖØ-öø-ÿ]{3,})*$/
          ),
        ]),
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      // Qui un validator personnalizzato passato in secondo param per il FormGroup
      { validators: passwordMatchValidator() }
    );
  }

  public updateFormErrors() {
    this.formErrorHandler.updateFormErrors(this.form, this.formErrors);
  }

  public submit(): void {
    if (this.form.valid) {
      const surname = this.form.get('surname')?.value;
      const name = this.form.get('name')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.authService.register$(surname, name, email, password).subscribe({
        next: (user) => {
          this.form.reset();
          this.router.navigate(['/auth/login']);
        },
        // messaggi di errori provenienti dal clienteService dopo la sua interazione con il server
        error: (error) => {
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.updateFormErrors();
      this.formErrors['form'].message =
        'Le formulaire est incomplet ou contient des erreurs, verifier les champs.';
    }
  }
}
