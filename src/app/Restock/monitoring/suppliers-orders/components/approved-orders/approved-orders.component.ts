import {Component, ViewChild} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
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
    EditOrderComponent
  ],
  templateUrl: './approved-orders.component.html',
  styleUrl: './approved-orders.component.css'
})
export class ApprovedOrdersComponent {
  displayedColumns: string[] = ['orderDate', 'state', 'shipDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];
  orders = new MatTableDataSource([
    {
      orderDate: '2025-06-08',
      state: 'On Hold',
      shipDate: '2025-04-08',
      restaurantName: 'Pizzería Bella',
      requestedProducts: 3,
      finalPrice: 89.90
    },
    {
      orderDate: '2025-04-07',
      state: 'On the Way',
      shipDate: '2025-06-07',
      restaurantName: 'Sushi Express',
      requestedProducts: 5,
      finalPrice: 145.50
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orders.paginator = this.paginator;
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




}
