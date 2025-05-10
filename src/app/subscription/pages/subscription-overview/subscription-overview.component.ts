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
      name: 'Plan Mensual',
      price: 'S/. 59.99 / mes',
      features: [
        'Gestión de inventario automatizado',
        'Control de pedidos y compras',
        'Reporte y analítica',
        'Notificaciones de stock crítico',
        'Integración con proveedores'
      ],
      popular: false
    },
    {
      name: 'Plan Anual',
      price: 'S/. 39.99 / mes',
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
