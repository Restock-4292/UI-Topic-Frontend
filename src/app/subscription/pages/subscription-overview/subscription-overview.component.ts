import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionsCardsComponent } from '../../components/subscriptions-cards/subscriptions-cards.component';

@Component({
  selector: 'app-subscription-overview',
  imports: [
    SubscriptionsCardsComponent
  ],
  templateUrl: './subscription-overview.component.html',
  styleUrl: './subscription-overview.component.css'
})
export class SubscriptionOverviewComponent {

}
