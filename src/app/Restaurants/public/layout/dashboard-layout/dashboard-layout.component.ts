import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

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
export class RestaurantDashboardLayoutComponent {
  menu = [
    { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard/restaurant/summary' },
    { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/restaurant/subscription' },
    { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/restaurant/inventory' },
    { labelKey: 'sidebar.suppliers', icon: 'groups', route: '/dashboard/restaurant/suppliers' },
    { labelKey: 'sidebar.alerts', icon: 'notifications', route: '/dashboard/restaurant/alerts' },
    { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/restaurant/orders' },
    { labelKey: 'sidebar.recipes', icon: 'restaurant_menu', route: '/dashboard/restaurant/recipes' },
    { labelKey: 'sidebar.sales', icon: 'room_service', route: '/dashboard/restaurant/sales' },
  ];

}
