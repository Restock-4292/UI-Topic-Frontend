import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subscriptions-cards',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgClass,     // ngClass para expresiones condicionales.
    MatIconModule,
  ],
  templateUrl: './subscriptions-cards.component.html',
  styleUrl: './subscriptions-cards.component.css'
})
export class SubscriptionsCardsComponent {
  //plans es arreglo de objetos
  plans = [
    {
      name: 'Monthly plan',
      price: 'S/. 59.99 / month',
      features: [
        'Automated inventory management',
        'Ordering and purchasing control',
        'Reporting and analytics ',
        'Critical stock notifications',
        'Integration with suppliers'
      ],
      popular: false
    },
    {
      name: 'Anual plan',
      price: 'S/. 39.99 / month',
      features: [
        'Gestión de inventario automatizado',
        'Control de pedidos y compras',
        'Reporte y analítica',
        'Notificaciones de stock crítico',
        'Integración con proveedores'
      ],
      popular: true
    },
    {
      name: 'Semiannual Plan',
      price: 'S/. 49.99 / month',
      features: [
        'Automated inventory management',
        'Ordering and purchasing control',
        'Reporting and analytics',
        'Critical stock notifications',
        'Integration with suppliers'
      ],
      popular: false
    }
  ];
}
