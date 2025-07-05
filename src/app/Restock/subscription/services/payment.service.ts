import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.serverBaseUrl;
  constructor(private http: HttpClient) { }

  processSubscriptionPayment(paymentData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/subscription_payment_details`, paymentData);
  }

  updateUserSubscription(userId: number, subscriptionId: number, paymentDetailId: number, startDate: string) {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, {
      subscription_id: subscriptionId,
      subscription_payment_details_id: paymentDetailId,
      start_date: startDate
    });
  }


}
