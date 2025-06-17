import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FilterSectionComponent} from '../filter-section/filter-section.component';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {ManageNewOrdersComponent} from '../manage-new-orders/manage-new-orders.component';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {Supply} from '../../../../resource/inventory/model/supply.entity';
import {OrderToSupplierBatch} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-batch.entity';
import {EmptySectionComponent} from '../../../../../shared/components/empty-section/empty-section.component';

@Component({
  selector: 'app-new-orders',
  imports: [
    FilterSectionComponent,
    MatPaginator,
    MatTableModule,
    MatIcon,
    CurrencyPipe,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatIconButton,
    MatButton,
    EmptySectionComponent,
    DatePipe
  ],
  templateUrl: './new-orders.component.html',
  styleUrl: './new-orders.component.css'
})

export class NewOrdersComponent {
  @Input() orders: Array<OrderToSupplier> = [];
  @Input() adminRestaurantsProfiles: { [orderId: number]: string } = {};

  @Input() orderSuppliesDetails: { orderId: number; supplies: Supply[] }[] = [];
  @Input() batchesGroupedByOrder: { orderId: number; batches: OrderToSupplierBatch[] }[] = [];

  @Output() manageNewOrderModal = new EventEmitter<OrderToSupplier>();
  @Output() declineDialog = new EventEmitter<OrderToSupplier>();
  @Output() detailsModal = new EventEmitter<OrderToSupplier>();

  displayedColumns: string[] = ['orderDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openOrderDetails(order: OrderToSupplier): void {
    this.detailsModal.emit(order);
  }

  openDeclineDialog(order: any): void {
    this.declineDialog.emit(order);
  }

  openManageNewOrderModal(order: any): void {
    this.manageNewOrderModal.emit(order);
  }

  searchTerm: string = '';
  dateRange: string = '';
  currentSortOrder: number = 1;

  onSearchChange(value: string): void {
    this.searchTerm = value;
    // Implementar lógica de búsqueda
  }

  onDateRangeChange(value: string): void {
    this.dateRange = value;
    // Implementar lógica de filtro por fecha
  }

  onToggleSort(): void {
    this.currentSortOrder = this.currentSortOrder === 1 ? -1 : 1;
    // Implementar lógica de ordenamiento
  }

}
