import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './public/dashboard-layout/dashboard-layout.component';
import {
  AnalyticsOverviewSupplierComponent
} from './Restock/Analytics/pages/analytics-overview-supplier/analytics-overview-supplier.component';
import {
  SupplierAlertsOverviewComponent
} from './Restock/monitoring/suppliers-orders/pages/supplier-alerts-overview/supplier-alerts-overview.component';
import {
  SubscriptionOverviewComponent
} from './Restock/subscription/pages/subscription-overview/subscription-overview.component';
import { SalesComponent } from './Restock/monitoring/restaurant-sales/pages/sales/sales.component';
import { RoleRedirectComponent } from './public/role-redirect/role-redirect.component';

import { ReviewsComponent } from './Restock/resource/orders-to-suppliers/pages/reviews/reviews.component';
import {
  AnalyticsOverviewRestaurantComponent
} from './Restock/Analytics/pages/analytics-overview-restaurant/analytics-overview-restaurant.component';
import { SupplierInventory } from './Restock/resource/inventory/pages/supplier-inventory/supplier-inventory.component';
import { ProfileOverviewComponent } from './Restock/profiles/pages/profile-overview/profile-overview.component';
import {

  RestaurantNotificationsComponent
} from './Restock/resource/inventory/pages/restaurant-notifications/restaurant-notifications.component';

import {
  RestaurantInventoryComponent
} from './Restock/resource/inventory/pages/restaurant-inventory/restaurant-inventory.component';
import {
  RestaurantRecipesOverviewComponent
} from './Restock/planning/recipe/pages/restaurant-recipes-overview/restaurant-recipes-overview.component';
import { OrdersComponent } from './Restock/resource/orders-to-suppliers/pages/orders/orders.component';
import {
  SuppliersOrdersOverviewComponent
} from './Restock/monitoring/suppliers-orders/pages/suppliers-orders-overview/suppliers-orders-overview.component';

export const routes: Routes = [

  {
    path: 'dashboard/restaurant', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewRestaurantComponent },
      { path: 'inventory', component: RestaurantInventoryComponent },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'subscription/plan/:id', loadComponent: () =>
          import('./Restock/subscription/pages/subscription-payment/subscription-payment.component')
            .then(m => m.SubscriptionPaymentPageComponent)
      },
      { path: 'sales', component: SalesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileOverviewComponent },
      { path: 'recipes', component: RestaurantRecipesOverviewComponent },
      { path: 'notifications', component: RestaurantNotificationsComponent }
    ]
  },
  {
    path: 'dashboard/supplier', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewSupplierComponent },
      { path: 'inventory', component: SupplierInventory },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'subscription/plan/:id', loadComponent: () =>
          import('./Restock/subscription/pages/subscription-payment/subscription-payment.component')
            .then(m => m.SubscriptionPaymentPageComponent)
      },
      { path: 'notifications', component: SupplierAlertsOverviewComponent },
      { path: 'orders', component: SuppliersOrdersOverviewComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'profile', component: ProfileOverviewComponent }
    ]
  },
  { path: '**', component: RoleRedirectComponent },

];
