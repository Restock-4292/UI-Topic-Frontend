import { Routes } from '@angular/router';
import { SubscriptionOverviewComponent } from './shared/subscription/pages/subscription-overview/subscription-overview.component';
import { RestaurantDashboardLayoutComponent } from './Restaurants/public/layout/dashboard-layout/dashboard-layout.component';
import { SuppliersDashboardLayoutComponent } from './Suppliers/public/layout/dashboard-layout/dashboard-layout.component';
import { RestaurantSummaryOverviewComponent } from './Restaurants/summary/pages/summary-overview/summary-overview.component';
import { SupplierSummaryOverviewComponent } from './Suppliers/summary/pages/summary-overview/summary-overview.component';
import { SupplierAlertsOverviewComponent } from './Suppliers/alerts/pages/alerts-overview/alerts-overview.component';


export const routes: Routes = [
    { path: 'dashboard/restaurant', redirectTo: 'dashboard/restaurant/summary' },
    { path: 'dashboard/supplier', redirectTo: 'dashboard/supplier/summary' },

    {
        path: 'dashboard/restaurant', component: RestaurantDashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' }, //  redirección interna
            { path: 'summary', component: RestaurantSummaryOverviewComponent },
            { path: 'subscription', component: SubscriptionOverviewComponent },
        ]
    },
    {
        path: 'dashboard/supplier', component: SuppliersDashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' }, //  redirección interna
            { path: 'summary', component: SupplierSummaryOverviewComponent },
            { path: 'subscription', component: SubscriptionOverviewComponent },
            { path: 'alerts', component: SupplierAlertsOverviewComponent },
        ]
    },
];
