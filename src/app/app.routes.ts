import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './public/dashboard-layout/dashboard-layout.component';
import { SupplierAlertsOverviewComponent } from './Restock/monitoring/suppliers-orders/pages/supplier-alerts-overview/supplier-alerts-overview.component';
import { SubscriptionOverviewComponent } from './Restock/subscription/pages/subscription-overview/subscription-overview.component';
import { RoleRedirectComponent } from './public/role-redirect/role-redirect.component';
import { ReviewsComponent } from './Restock/resource/orders-to-suppliers/pages/reviews/reviews.component';
import { AnalyticsOverviewRestaurantComponent } from './Restock/Analytics/pages/analytics-overview-restaurant/analytics-overview-restaurant.component';
import { SupplierOverviewComponent } from './Restock/resource/supplier-catalog/pages/supplier-overview/supplier-overview.component';
import { SupplierDetailComponent } from './Restock/resource/supplier-catalog/pages/supplier-detail/supplier-detail.component';
import { AnalyticsOverviewSupplierComponent } from './Restock/Analytics/pages/analytics-overview-supplier/analytics-overview-supplier.component';
import { SalesComponent } from './Restock/monitoring/restaurant-sales/pages/sales/sales.component';

export const routes: Routes = [

  {
    path: 'dashboard/restaurant', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewRestaurantComponent },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'suppliers', component: SupplierOverviewComponent },
      { path: 'suppliers/:id', component: SupplierDetailComponent },
      { path: 'sales', component: SalesComponent },
    ]
  },
  {
    path: 'dashboard/supplier', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewSupplierComponent },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'alerts', component: SupplierAlertsOverviewComponent },
      { path: 'reviews', component: ReviewsComponent },
    ]
  },
  { path: '**', component: RoleRedirectComponent },

];
