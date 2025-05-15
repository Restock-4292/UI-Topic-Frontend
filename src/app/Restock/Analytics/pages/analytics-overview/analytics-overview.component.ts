import { Component } from '@angular/core';
import {SupplierAlertsWidgetComponent} from '../../components/supplier-alerts-widget/supplier-alerts-widget.component';
import {
  SupplierAccountWidgetComponent
} from '../../components/supplier-account-widget/supplier-account-widget.component';

@Component({
  selector: 'app-analytics-overview',
  imports: [
    SupplierAlertsWidgetComponent,
    SupplierAccountWidgetComponent
  ],
  templateUrl: './analytics-overview.component.html',
  styleUrl: './analytics-overview.component.css'
})
export class AnalyticsOverviewComponent {

}
