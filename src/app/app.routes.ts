import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './public/dashboard-layout/dashboard-layout.component';
import { SubscriptionOverviewComponent } from './Restock/Subscription and Payments/pages/subscription-overview/subscription-overview.component';
import { AnalyticsOverviewComponent } from './Restock/Analytics/pages/analytics-overview/analytics-overview.component';
import { SupplierAlertsOverviewComponent } from './Restock/Service operation and Monitoring/pages/supplier-alerts-overview/supplier-alerts-overview.component';


export const routes: Routes = [
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
        ]
    },
];
