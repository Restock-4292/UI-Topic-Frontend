import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {FilterSectionComponent} from "../filter-section/filter-section.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {EmptySectionComponent} from '../../../../../shared/components/empty-section/empty-section.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-delivered-orders',
  imports: [
    CurrencyPipe,
    FilterSectionComponent,
    MatIcon,
    MatPaginator,
    MatTableModule,
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

  @Output() detailsModal = new EventEmitter<OrderToSupplier>();

  displayedColumns: string[] = ['orderDate', 'shipDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openOrderDetails(order: OrderToSupplier) {
    this.detailsModal.emit(order);
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
