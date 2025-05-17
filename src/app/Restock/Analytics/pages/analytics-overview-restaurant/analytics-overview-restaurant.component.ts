import { Component } from '@angular/core';
import {  RestaurantLastSuppliesWidgetComponent} from '../../components/restaurant-last-supplies-widget/restaurant-last-supplies-widget.component';
import { RestaurantAlertsWidgetComponent } from '../../components/restaurant-alerts-widget/restaurant-alerts-widget.component';
import {  RestaurantPendingOrdersWidgetComponent} from '../../components/restaurant-pending-orders-widget/restaurant-pending-orders-widget.component';

@Component({
  selector: 'app-analytics-overview-restaurant',
  imports: [
    RestaurantAlertsWidgetComponent,
    RestaurantLastSuppliesWidgetComponent,
    RestaurantPendingOrdersWidgetComponent
  ],
  templateUrl: './analytics-overview-restaurant.component.html',
  styleUrl: './analytics-overview-restaurant.component.css'
})
export class AnalyticsOverviewRestaurantComponent {

}
