import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";

import { MatNavList } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { User, UserService } from '../../../../services/user.service';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';

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
    { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard/supplier/summary' },
    { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/supplier/subscription' },
    { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/supplier/inventory' },
    { labelKey: 'sidebar.alerts', icon: 'notifications', route: '/dashboard/supplier/alerts' },
    { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/supplier/orders' },
    { labelKey: 'sidebar.reviews', icon: 'restaurant_menu', route: '/dashboard/supplier/reviews' },
  ];


  user!: User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }
}
