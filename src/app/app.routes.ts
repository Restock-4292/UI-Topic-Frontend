import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './public/dashboard-layout/dashboard-layout.component';
import { AnalyticsOverviewComponent } from './Restock/Analytics/pages/analytics-overview/analytics-overview.component';
import { SupplierAlertsOverviewComponent } from './Restock/service-operation-and-monitoring/pages/supplier-alerts-overview/supplier-alerts-overview.component';
import { SubscriptionOverviewComponent } from './Restock/subscription-and-payments/pages/subscription-overview/subscription-overview.component';
import { ReviewsComponent } from './Restock/asset-and-resource-management/pages/reviews/reviews.component';
import {RoleRedirectComponent} from './public/components/role-redirect/role-redirect.component';


export const routes: Routes = [
  { path: '', component: RoleRedirectComponent },

  { path: 'dashboard/restaurant', redirectTo: 'dashboard/restaurant/summary' },
    { path: 'dashboard/supplier', redirectTo: 'dashboard/supplier/summary' },

    {
        path: 'dashboard/restaurant', component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' }, //  redirección interna
            { path: 'summary', component: AnalyticsOverviewComponent },
            { path: 'subscription', component: SubscriptionOverviewComponent },
        ]
    },
    {
        path: 'dashboard/supplier', component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' }, //  redirección interna
            { path: 'summary', component: AnalyticsOverviewComponent },
            { path: 'subscription', component: SubscriptionOverviewComponent },
            { path: 'alerts', component: SupplierAlertsOverviewComponent },
            { path: 'reviews', component: ReviewsComponent },

        ]
    },
];
