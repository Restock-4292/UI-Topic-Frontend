import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { mockUser } from '../../shared/mocks/user.mock';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatIconButton],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})

export class DashboardLayoutComponent implements OnInit {
  user = mockUser;
  menu: Array<{ labelKey: string, icon: string, route: string }> = [];

  router = inject(Router);

  isMobile: boolean = false;
  private mobileQuery: MediaQueryList;

  constructor() {
    this.mobileQuery = window.matchMedia('(max-width: 600px)');
    this.isMobile = this.mobileQuery.matches;
    this.mobileQuery.addEventListener('change', () => {
      this.isMobile = this.mobileQuery.matches;
    });
  }

  ngOnInit() {



    if (this.user.role_id.name === 'supplier') {
      this.menu = [
        { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard/supplier/summary' },
        { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/supplier/subscription' },
        { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/supplier/inventory' },
        { labelKey: 'sidebar.alerts', icon: 'notifications', route: '/dashboard/supplier/alerts' },
        { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/supplier/orders' },
        { labelKey: 'sidebar.reviews', icon: 'reviews', route: '/dashboard/supplier/reviews' },
      ];
    } else if (this.user.role_id.name === 'restaurant') {
      this.menu = [
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
  }
}
