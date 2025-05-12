import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatNavList } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { LanguageSwitcherComponent } from "../../../../shared/components/language-switcher/language-switcher.component";
import { TranslatePipe } from "@ngx-translate/core";
import { User, UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatNavList,
    RouterLink,
    MatIcon,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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


  user!: User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }
}
