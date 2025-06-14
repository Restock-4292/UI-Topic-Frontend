import {Component, Input, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {FilterSectionComponent} from "../filter-section/filter-section.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {MatIconButton} from '@angular/material/button';
import {EditOrderComponent} from '../edit-order/edit-order.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {Supply} from '../../../../resource/inventory/model/supply.entity';
import {OrderToSupplierBatch} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-batch.entity';

@Component({
  selector: 'app-approved-orders',
  imports: [
    CurrencyPipe,
    FilterSectionComponent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTableModule,
    OrderDetailsComponent,
    MatIconButton,
    EditOrderComponent,
    DatePipe
  ],
  templateUrl: './approved-orders.component.html',
  styleUrl: './approved-orders.component.css'
})
export class ApprovedOrdersComponent {
  @Input() orders: Array<OrderToSupplier> = [];
  @Input() adminRestaurantsProfiles: { [orderId: number]: string } = {};

  displayedColumns: string[] = ['orderDate', 'state', 'shipDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];

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


  showEditModal = false;

  openEditOrderDetails() {
    this.showEditModal = true;
  }

  onEditModalChange(value: boolean) {
    this.showEditModal = value;
  }

  onEditModalClose(value: boolean) {
    this.showEditModal = value;
  }

  // Method to get CSS class according to the order state
  getRowClass(order: OrderToSupplier): string {
    if (!order.state || !order.state.name) return '';

    switch (order.state.name.toLowerCase()) {
      case 'on hold':
        return 'row-on-hold';
      case 'on the way':
        return 'row-on-the-way';
      case 'delivered':
        return 'row-delivered';
      case 'preparing':
        return 'row-preparing';
      default:
        return '';
    }
  }


}
