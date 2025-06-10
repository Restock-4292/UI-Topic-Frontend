import {Component, ViewChild} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {FilterSectionComponent} from "../filter-section/filter-section.component";
import { MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-delivered-orders',
  imports: [
    CurrencyPipe,
    FilterSectionComponent,
    MatIcon,
    MatPaginator,
    MatTableModule,
    OrderDetailsComponent,
    MatIconButton
  ],
  templateUrl: './delivered-orders.component.html',
  styleUrl: './delivered-orders.component.css'
})
export class DeliveredOrdersComponent {
  displayedColumns: string[] = ['orderDate', 'shipDate', 'restaurantName', 'requestedProducts', 'finalPrice', 'actions'];
  orders = new MatTableDataSource([
    {
      orderDate: '2025-06-08',
      shipDate: '2025-04-08',
      restaurantName: 'Pizzería Bella',
      requestedProducts: 3,
      finalPrice: 89.90
    },
    {
      orderDate: '2025-04-07',
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
}
