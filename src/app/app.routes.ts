import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './public/dashboard-layout/dashboard-layout.component';
import { AnalyticsOverviewComponent } from './Restock/Analytics/pages/analytics-overview/analytics-overview.component';
import { SupplierAlertsOverviewComponent } from './Restock/service-operation-and-monitoring/pages/supplier-alerts-overview/supplier-alerts-overview.component';
import { SubscriptionOverviewComponent } from './Restock/subscription-and-payments/pages/subscription-overview/subscription-overview.component';
import { ReviewsComponent } from './Restock/asset-and-resource-management/pages/reviews/reviews.component';
import { SalesComponent } from './Restock/service-operation-and-monitoring/pages/sales/sales.component';
import { RoleRedirectComponent } from './public/role-redirect/role-redirect.component';
import {
  SupplierOverviewComponent
} from './Restock/asset-and-resource-management/pages/supplier-overview/supplier-overview.component';
import {
  SupplierDetailComponent
} from './Restock/asset-and-resource-management/pages/supplier-detail/supplier-detail.component';


export const routes: Routes = [

  {
    path: 'dashboard/restaurant', component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: AnalyticsOverviewComponent },
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
      { path: 'summary', component: AnalyticsOverviewComponent },
      { path: 'subscription', component: SubscriptionOverviewComponent },
      { path: 'alerts', component: SupplierAlertsOverviewComponent },
      { path: 'reviews', component: ReviewsComponent },
    ]
  },
  { path: '**', component: RoleRedirectComponent },

];
