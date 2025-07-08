import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {Profile} from '../../../profiles/model/profile.entity';
import {SessionService} from '../../../../shared/services/session.service';
import {ProfileService} from '../../../profiles/services/profile.service';
import {PaymentService} from '../../services/payment.service';
import {PaymentAccountEntity} from '../../model/payment-account.entity';
import {firstValueFrom} from 'rxjs';

function cleanCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\s|-/g, '');
}

function getCardType(cardNumber: string): string | undefined {
  const cleanedNumber = cleanCardNumber(cardNumber);

  const visaPattern = /^4\d{12}(?:\d{3})?$/;
  const mastercardPattern = /^(?:5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/;

  if (visaPattern.test(cleanedNumber)) {
    return 'Visa';
  } else if (mastercardPattern.test(cleanedNumber)) {
    return 'Mastercard';
  } else {
    return undefined;
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
  profile: Profile = new Profile();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private profileService: ProfileService,
    private paymentService : PaymentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, this.expiryDateValidator]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardholderName: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['']
    });

    const profileId = this.sessionService.getProfileId();
    if (profileId === null) {
      console.error('No se encontró el profileId en la sesión');
      return;
    }

    this.profile = await firstValueFrom(this.profileService.loadProfileByUserId(profileId));

  }

  submitForm() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const paymentAccount = new PaymentAccountEntity({
        user_id: this.profile.user_id,
        email: formValue.email,
        card_type: getCardType(formValue.cardNumber) || 'Unknown',
        expiration: formValue.expiry,
        cardholder_name: formValue.cardholderName,
        country: formValue.country,
        zip: formValue.zip,
        phone: formValue.phone
      });

      this.paymentService.createPaymentAccount(paymentAccount).subscribe({
        next:()=>{
          alert("Payment account created successfully");

          const role = this.profile.user?.role_id === 2 ? 'restaurant' : 'supplier';
          this.router.navigate([`/dashboard/${role}/summary`]);
        },
        error: (error) => {
          console.error('Error creating payment account:', error);
          alert('There was an error creating the payment account. Please try again.');
        }
      });

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

  getCardTypeDisplay(): string {
    const number = this.form.get('cardNumber')?.value || '';
    return getCardType(number) || 'Unknown';
  }

}
