import {Component, Input, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FilterSectionComponent} from '../filter-section/filter-section.component';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {CurrencyPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {ManageNewOrdersComponent} from '../manage-new-orders/manage-new-orders.component';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {Supply} from '../../../../resource/inventory/model/supply.entity';
import {OrderToSupplierBatch} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-batch.entity';

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
    OrderDetailsComponent,
    ManageNewOrdersComponent
  ],
  templateUrl: './new-orders.component.html',
  styleUrl: './new-orders.component.css'
})

export class NewOrdersComponent {
  @Input() orders: Array<OrderToSupplier> = [];
  @Input() adminRestaurantsProfiles: { [orderId: number]: string } = {};

  @Input() orderSuppliesDetails: { orderId: number; supplies: Supply[] }[] = [];
  @Input() suppliesGroupedByOrder: { orderId: number; supplies: OrderToSupplierBatch[] }[] = [];


  displayedColumns: string[] = ['orderDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  showManageNewOrderModal = false;

  openManageNewOrder() {
    this.showManageNewOrderModal = true;
  }

  onManageNewOrderModalChange(value: boolean) {
    this.showManageNewOrderModal = value;
  }

  onManageNewOrderModalClose(value: boolean) {
    this.showManageNewOrderModal = value;
  }

}
