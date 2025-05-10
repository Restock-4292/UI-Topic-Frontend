import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { User, UserService } from "../../../services/user.service";
import { MatNavList } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  standalone: true,
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
    { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard//summary' },
    { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/subscription' },
    { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/inventory' },
    { labelKey: 'sidebar.suppliers', icon: 'groups', route: '/dashboard/suppliers' },
    { labelKey: 'sidebar.alerts', icon: 'notifications', route: '/dashboard/alerts' },
    { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/orders' },
    { labelKey: 'sidebar.recipes', icon: 'restaurant_menu', route: '/dashboard/recipes' },
    { labelKey: 'sidebar.sales', icon: 'room_service', route: '/dashboard/sales' },
  ];


  user!: User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }
}
