import { Routes } from '@angular/router';
import { SubscriptionOverviewComponent } from './subscription/pages/subscription-overview/subscription-overview.component';
import { DashboardLayoutComponent } from './public/layout/dashboard-layout/dashboard-layout.component';
import { SummaryOverviewComponent } from './summary/pages/summary-overview/summary-overview.component';

export const routes: Routes = [
    {
        path: 'dashboard', component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' }, //  redirección interna
            { path: 'summary', component: SummaryOverviewComponent },
            { path: 'subscription', component: SubscriptionOverviewComponent },
        ]
    },
    { path: '**', redirectTo: '/dashboard/summary' } // ruta comodín para errores 404



];
