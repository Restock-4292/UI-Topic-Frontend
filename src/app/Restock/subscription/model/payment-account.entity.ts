export class PaymentAccountEntity{
  user_id: number;
  email: string;
  card_type: string;
  expiration: string;
  cardholder_name: string;
  country: string;
  zip: string;
  phone: string;

  constructor(paymentAccount: {
    user_id?: number;
    email?: string;
    card_type?: string;
    expiration?: string;
    cardholder_name?: string;
    country?: string;
    zip?: string;
    phone?: string;
  }) {
    this.user_id = paymentAccount.user_id || 0;
    this.email = paymentAccount.email || '';
    this.card_type = paymentAccount.card_type || '';
    this.expiration = paymentAccount.expiration || '';
    this.cardholder_name = paymentAccount.cardholder_name || '';
    this.country = paymentAccount.country || '';
    this.zip = paymentAccount.zip || '';
    this.phone = paymentAccount.phone || '';
  }

}
