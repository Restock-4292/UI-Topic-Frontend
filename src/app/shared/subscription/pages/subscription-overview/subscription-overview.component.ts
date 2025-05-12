import { Component, inject } from '@angular/core';
import { SubscriptionsCardsComponent } from '../../components/subscriptions-cards/subscriptions-cards.component';
import { Subscription } from '../../model/subscription.entity';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { mockUser } from '../../../mocks/user.mock';
@Component({
  selector: 'app-subscription-overview',
  imports: [
    SubscriptionsCardsComponent
  ],
  templateUrl: './subscription-overview.component.html',
  styleUrl: './subscription-overview.component.css'
})
export class SubscriptionOverviewComponent {
  private router = inject(Router); // 👈 usar inject() si usas inyección funcional

  subscriptions: Array<Subscription> = [];

  //fake api
  private subscriptionApi = inject(SubscriptionService);

  user = mockUser;

  ngOnInit(): void {
    const role = this.user.role_id.name; //1: restaurant 2:supplier
    const currentSegment = this.router.url.includes('/restaurant') ? 'restaurant' : 'supplier';

    if ((role === 'restaurant' && currentSegment !== 'restaurant') ||
      (role === 'supplier' && currentSegment !== 'supplier')) {
      // Redirige al dashboard correcto
      this.router.navigate([`dashboard/${role}/summary`]);
      return;
    }

    // Continuar con lógica normal si todo está bien
    this.subscriptionApi.getAll().subscribe(subs => this.subscriptions = subs);

    this.subscriptionApi.getAll().subscribe(subs => {
      this.subscriptions = subs.filter(
        s => s.rol_id === String(this.user.role_id.id)
      );
    });
  }


}
