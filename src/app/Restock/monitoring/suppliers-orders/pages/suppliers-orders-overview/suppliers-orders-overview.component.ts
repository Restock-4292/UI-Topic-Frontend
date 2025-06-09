import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {NewOrdersComponent} from '../../components/new-orders/new-orders.component';
import {ApprovedOrdersComponent} from '../../components/approved-orders/approved-orders.component';
import {DeliveredOrdersComponent} from '../../components/delivered-orders/delivered-orders.component';


@Component({
  selector: 'app-suppliers-orders-overview',
  imports: [
    MatTabsModule,
    NewOrdersComponent,
    ApprovedOrdersComponent,
    DeliveredOrdersComponent
  ],
  templateUrl: './suppliers-orders-overview.component.html',
  styleUrl: './suppliers-orders-overview.component.css'
})
export class SuppliersOrdersOverviewComponent {

}
