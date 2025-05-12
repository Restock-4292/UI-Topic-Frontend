import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionsCardsComponent } from '../../components/subscriptions-cards/subscriptions-cards.component';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from '../../model/subscription.entity';

@Component({
  selector: 'app-subscription-overview',
  imports: [
    SubscriptionsCardsComponent
  ],
  templateUrl: './subscription-overview.component.html',
  styleUrl: './subscription-overview.component.css'
})
export class SubscriptionOverviewComponent {
  subscriptions: Array<Subscription> = [];

  //fake api
  private subscriptionApi = inject(SubscriptionService);

  //se llama al  cargar el componente
  ngOnInit(): void {
    this.subscriptionApi.getAll().subscribe(subscriptions => {
      this.subscriptions = subscriptions;
      console.log("subscriptions: ", subscriptions);
    })
  }

}
