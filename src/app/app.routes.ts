import {Routes} from '@angular/router';
import {DashboardLayoutComponent} from './public/dashboard-layout/dashboard-layout.component';
import {
  AnalyticsOverviewSupplierComponent
} from './Restock/Analytics/pages/analytics-overview-supplier/analytics-overview-supplier.component';
import {
  SupplierAlertsOverviewComponent
} from './Restock/monitoring/suppliers-orders/pages/supplier-alerts-overview/supplier-alerts-overview.component';
import {
  SubscriptionOverviewComponent
} from './Restock/subscription/pages/subscription-overview/subscription-overview.component';
import {SalesComponent} from './Restock/monitoring/restaurant-sales/pages/sales/sales.component';
import {RoleRedirectComponent} from './public/role-redirect/role-redirect.component';

import {
  SupplierOverviewComponent
} from './Restock/resource/supplier-catalog/pages/supplier-overview/supplier-overview.component';
import {
  SupplierDetailComponent
} from './Restock/resource/supplier-catalog/pages/supplier-detail/supplier-detail.component';
import {ReviewsComponent} from './Restock/resource/orders-to-suppliers/pages/reviews/reviews.component';
import {
  AnalyticsOverviewRestaurantComponent
} from './Restock/Analytics/pages/analytics-overview-restaurant/analytics-overview-restaurant.component';
import {SupplierInventory} from './Restock/resource/inventory/pages/supplier-inventory/supplier-inventory.component';
import {ProfileOverviewComponent} from './Restock/profiles/pages/profile-overview/profile-overview.component';
import {

  RestaurantAlertsComponent
} from './Restock/resource/inventory/pages/restaurant-alerts/restaurant-alerts.component';

import {
  RestaurantInventoryComponent
} from './Restock/resource/inventory/pages/restaurant-inventory/restaurant-inventory.component';


export const routes: Routes = [

  {
    path: 'dashboard/restaurant', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewRestaurantComponent },
      { path: 'inventory', component: RestaurantInventoryComponent },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'suppliers', component: SupplierOverviewComponent },
      { path: 'suppliers/:id', component: SupplierDetailComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'profile', component: ProfileOverviewComponent },
      {path: 'alerts', component: RestaurantAlertsComponent}
    ]
  },
  {
    path: 'dashboard/supplier', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewSupplierComponent },
      { path: 'inventory', component: SupplierInventory },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'alerts', component: SupplierAlertsOverviewComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'profile', component: ProfileOverviewComponent }
    ]
  },
  { path: '**', component: RoleRedirectComponent },

];
