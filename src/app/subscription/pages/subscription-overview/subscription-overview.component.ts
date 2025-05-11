import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subscription-overview',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgClass,
    MatIconModule
  ],
  templateUrl: './subscription-overview.component.html',
  styleUrl: './subscription-overview.component.css'
})
export class SubscriptionOverviewComponent {
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
      name: 'Plan Semestral',
      price: 'S/. 49.99 / mes',
      features: [
        'Gestión de inventario automatizado',
        'Control de pedidos y compras',
        'Reporte y analítica',
        'Notificaciones de stock crítico',
        'Integración con proveedores'
      ],
      popular: false
    }
  ];
}
