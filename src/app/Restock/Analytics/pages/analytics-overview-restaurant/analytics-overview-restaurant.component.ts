import { Component } from '@angular/core';
import {
  RestaurantAlertsWidgetComponent
} from '../../components/restaurant-alerts-widget/restaurant-alerts-widget.component';

@Component({
  selector: 'app-analytics-overview-restaurant',
  imports: [
    RestaurantAlertsWidgetComponent
  ],
  templateUrl: './analytics-overview-restaurant.component.html',
  styleUrl: './analytics-overview-restaurant.component.css'
})
export class AnalyticsOverviewRestaurantComponent {

}
