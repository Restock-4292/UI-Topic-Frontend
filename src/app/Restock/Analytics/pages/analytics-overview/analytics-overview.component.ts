import { Component } from '@angular/core';
import {SupplierAlertsWidgetComponent} from '../../components/supplier-alerts-widget/supplier-alerts-widget.component';
import {
  SupplierAccountWidgetComponent
} from '../../components/supplier-account-widget/supplier-account-widget.component';
import { SupplierFrequentCustomersWidgetComponent } from '../../components/supplier-frequent-customers-widget/supplier-frequent-customers-widget.component';

@Component({
  selector: 'app-analytics-overview',
  imports: [
    SupplierAlertsWidgetComponent,
    SupplierAccountWidgetComponent,
    SupplierFrequentCustomersWidgetComponent
  ],
  templateUrl: './analytics-overview.component.html',
  styleUrl: './analytics-overview.component.css'
})
export class AnalyticsOverviewComponent {

}
