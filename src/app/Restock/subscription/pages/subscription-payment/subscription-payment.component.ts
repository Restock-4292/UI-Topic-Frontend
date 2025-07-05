import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PaymentFormComponent} from '../../components/payment-form/payment-form.component';
import {SubscriptionService} from '../../services/subscription.service';
import {Subscription} from '../../model/subscription.entity';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-subscription-payment',
  standalone: true,
  imports: [CommonModule, PaymentFormComponent, TranslatePipe],
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.css']
})

export class SubscriptionPaymentPageComponent implements OnInit {
  subscription: Subscription | undefined;

  private route = inject(ActivatedRoute);
  private subscriptionService = inject(SubscriptionService);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // ← Ahora es string directamente

    this.subscriptionService.getAll().subscribe(subs => {
      this.subscription = subs.find(s => s.id.toString() === id?.toString());
    });
  }

  goBack() {
    this.router.navigate(['/subscription']);
  }

}
