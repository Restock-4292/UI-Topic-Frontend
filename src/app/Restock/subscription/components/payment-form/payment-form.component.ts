import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

function cleanCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\s|-/g, '');
}

function getCardType(cardNumber: string): string | null {
  const cleanedNumber = cleanCardNumber(cardNumber);

  const visaPattern = /^4\d{12}(?:\d{3})?$/;
  const mastercardPattern = /^(?:5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/;

  if (visaPattern.test(cleanedNumber)) {
    return 'Visa';
  } else if (mastercardPattern.test(cleanedNumber)) {
    return 'Mastercard';
  } else {
    return null;
  }
}

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {
  @Input() subscription: any;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expiry: ['', [Validators.required, this.expiryDateValidator]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardholderName: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['']
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Datos válidos:', this.form.value);
      alert('Pago exitoso');

      this.router.navigate(['/summary']);
    } else {
      this.form.markAllAsTouched();
    }
  }


  expiryDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const match = value.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return { invalidFormat: true };

    const month = parseInt(match[1], 10);
    const year = parseInt('20' + match[2], 10);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (month < 1 || month > 12) return { invalidMonth: true };

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expired: true };
    }

    return null;
  }
}
