import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {Profile} from '../../Restock/profiles/model/profile.entity';
import {ProfileService} from '../../Restock/profiles/services/profile.service';
import {SessionService} from '../../shared/services/session.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatIconButton],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})

export class DashboardLayoutComponent implements OnInit {
  menu: Array<{ labelKey: string, icon: string, route: string }> = [];

  router = inject(Router);

  profile: Profile = new Profile();
  private currentRole: number | null = null; // Store the current role ID
  isMobile: boolean = false;
  private mobileQuery: MediaQueryList;

  constructor(
    private profileService: ProfileService,
    private sessionService: SessionService
  ) {
    this.mobileQuery = window.matchMedia('(max-width: 600px)');
    this.isMobile = this.mobileQuery.matches;
    this.mobileQuery.addEventListener('change', () => {
      this.isMobile = this.mobileQuery.matches;
    });
  }

  async ngOnInit() {
    // Simulate fetching the role ID from a service or session
    //const fakeProfileId = 2; // DEFINIR AQUI EL ID DEL PERFIL ACTUAL
    // 1 -> Supplier pepe
    // 2 -> Restaurant maria
    // 3 -> Supplier Juan
    // 4 -> Restaurant Luis

    const roleId = this.sessionService.getRoleId();
    this.currentRole = this.sessionService.getRoleId();
    const profileId = this.sessionService.getProfileId();
    if(roleId == null) {
      console.error('No roleId found in localStorage/session.');
      return;
    }
    if (profileId == null) {
      console.error('No profileId found in localStorage/session.');
      return;
    }
    this.sessionService.setProfileId(roleId);
    await this.loadProfile();
    this.setMenu();
  }

  async loadProfile() {
    try {
      this.profile = await this.profileService.getProfileById(this.sessionService.getProfileId()!);

      console.log('Profile loaded:', this.profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  setMenu() {
    if (this.currentRole === 1) {
      this.menu = [
        { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard/supplier/summary' },
        { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/supplier/subscription' },
        { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/supplier/inventory' },
        { labelKey: 'sidebar.notifications', icon: 'notifications', route: '/dashboard/supplier/notifications' },
        { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/supplier/orders' },
        { labelKey: 'sidebar.reviews', icon: 'reviews', route: '/dashboard/supplier/reviews' },
      ];
    } else if (this.currentRole=== 2) {
      this.menu = [
        { labelKey: 'sidebar.summary', icon: 'bar_chart', route: '/dashboard/restaurant/summary' },
        { labelKey: 'sidebar.subscription', icon: 'credit_card', route: '/dashboard/restaurant/subscription' },
        { labelKey: 'sidebar.inventory', icon: 'inventory_2', route: '/dashboard/restaurant/inventory' },
        { labelKey: 'sidebar.notifications', icon: 'notifications', route: '/dashboard/restaurant/notifications' },
        { labelKey: 'sidebar.orders', icon: 'local_shipping', route: '/dashboard/restaurant/orders' },
        { labelKey: 'sidebar.recipes', icon: 'restaurant_menu', route: '/dashboard/restaurant/recipes' },
        { labelKey: 'sidebar.sales', icon: 'room_service', route: '/dashboard/restaurant/sales' },
      ];
    }
  }

}
