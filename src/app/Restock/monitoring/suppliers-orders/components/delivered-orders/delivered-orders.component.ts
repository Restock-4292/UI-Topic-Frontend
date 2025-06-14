import {Component, Input, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {FilterSectionComponent} from "../filter-section/filter-section.component";
import { MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {MatIconButton} from '@angular/material/button';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {EmptySectionComponent} from '../../../../../shared/components/empty-section/empty-section.component';

@Component({
  selector: 'app-delivered-orders',
  imports: [
    CurrencyPipe,
    FilterSectionComponent,
    MatIcon,
    MatPaginator,
    MatTableModule,
    OrderDetailsComponent,
    MatIconButton,
    DatePipe,
    EmptySectionComponent
  ],
  templateUrl: './delivered-orders.component.html',
  styleUrl: './delivered-orders.component.css'
})
export class DeliveredOrdersComponent {
  @Input() orders: Array<OrderToSupplier> = [];
  @Input() adminRestaurantsProfiles: { [orderId: number]: string } = {};

  displayedColumns: string[] = ['orderDate', 'shipDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  showModal = false;

  openOrderDetails() {
    this.showModal = true;
  }

  onModalChange(value: boolean) {
    this.showModal = value;
  }

  onModalClose(value: boolean) {
    this.showModal = value;
  }

  // Method to get CSS class according to the order state
  getRowClass(order: OrderToSupplier): string {
    if (!order.state || !order.state.name) return '';

    if (order.state.name.toLowerCase() == 'delivered')
        return 'row-delivered';
    else
      return '';
  }
}
