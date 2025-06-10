import {Component, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FilterSectionComponent} from '../filter-section/filter-section.component';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {CurrencyPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {ManageNewOrdersComponent} from '../manage-new-orders/manage-new-orders.component';

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
  displayedColumns: string[] = ['orderDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];
  orders = new MatTableDataSource([
    {
      orderDate: '2025-06-08',
      restaurantName: 'Pizzería Bella',
      requestedProducts: 3,
      finalPrice: 89.90
    },
    {
      orderDate: '2025-06-07',
      restaurantName: 'Sushi Express',
      requestedProducts: 5,
      finalPrice: 145.50
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orders.paginator = this.paginator;
  }

  searchTerm: string = '';
  dateRange: string = '';
  currentSortOrder: number = 1;

  onSearchChange(value: string): void {
    this.searchTerm = value;
    // Implementar lógica de búsqueda
    this.orders.filter = value.trim().toLowerCase();
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
