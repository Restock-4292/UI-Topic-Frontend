import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {FilterSectionComponent} from "../filter-section/filter-section.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {EmptySectionComponent} from '../../../../../shared/components/empty-section/empty-section.component';

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
    MatIconButton,
    DatePipe,
    EmptySectionComponent
  ],
  templateUrl: './approved-orders.component.html',
  styleUrl: './approved-orders.component.css'
})
export class ApprovedOrdersComponent {
  @Input() orders: Array<OrderToSupplier> = [];
  @Input() adminRestaurantsProfiles: { [orderId: number]: string } = {};

  @Output() deleteDialog = new EventEmitter<OrderToSupplier>();
  @Output() detailsModal = new EventEmitter<OrderToSupplier>();
  @Output() editModal = new EventEmitter<OrderToSupplier>();

  displayedColumns: string[] = ['orderDate', 'state', 'shipDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openOrderDetails(order: OrderToSupplier): void {
    this.detailsModal.emit(order);
  }

  openDeleteDialog(order: any): void {
    this.deleteDialog.emit(order);
  }

  openEditOrder(order: any): void  {
    this.editModal.emit(order);
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
