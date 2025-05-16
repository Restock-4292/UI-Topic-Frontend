import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {mockRestaurantAlerts} from '../../../../../shared/mocks/alerts.mock';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-restaurant-alerts',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, MatCardModule],
  templateUrl: './restaurant-alerts.component.html',
  styleUrls: ['./restaurant-alerts.component.css']
})
export class RestaurantAlertsComponent {
  alerts = mockRestaurantAlerts;
  filter = 'All';

  get filteredAlerts() {
    if (this.filter === 'All') return this.alerts;
    return this.alerts.filter(a => a.status === this.filter);
  }

  get filterOptions() {
    return ['All', 'Low stock', 'Max stock'];
  }
}
