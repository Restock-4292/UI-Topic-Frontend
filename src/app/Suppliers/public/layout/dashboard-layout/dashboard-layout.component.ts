import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class SuppliersDashboardLayoutComponent {
  menu = [
    { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard/supplier/summary' },
    { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/supplier/subscription' },
    { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/supplier/inventory' },
    { labelKey: 'sidebar.alerts', icon: 'notifications', route: '/dashboard/supplier/alerts' },
    { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/supplier/orders' },
    { labelKey: 'sidebar.reviews', icon: 'reviews', route: '/dashboard/supplier/reviews' },
  ];
}
