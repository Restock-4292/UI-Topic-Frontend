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
  }

  onDateRangeChange(value: string): void {
    this.dateRange = value;
  }

  onToggleSort(): void {
    this.currentSortOrder = this.currentSortOrder === 1 ? -1 : 1;
  }

  get filteredOrders(): OrderToSupplier[] {
    let filtered = [...this.orders];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(order =>
        order.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.adminRestaurantsProfiles[order.id]?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de fechas (ejemplo simple)
    if (this.dateRange === '7days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(order => order.estimated_ship_date && new Date(order.estimated_ship_date) >= sevenDaysAgo);
    } else if (this.dateRange === '30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(order => order.estimated_ship_date && new Date(order.estimated_ship_date) >= thirtyDaysAgo);
    } else if (this.dateRange === '3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filtered = filtered.filter(order => order.estimated_ship_date && new Date(order.estimated_ship_date) >= threeMonthsAgo);
    }

    // Ordenar
    filtered.sort((a, b) => {
      const dateA = a.estimated_ship_time?.getTime() || 0;
      const dateB = b.estimated_ship_time?.getTime() || 0;
      return this.currentSortOrder * (dateA - dateB);
    });

    return filtered;
  }

}
