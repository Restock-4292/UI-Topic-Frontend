import {Component, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {FilterSectionComponent} from '../filter-section/filter-section.component';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-new-orders',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatTable,
    FilterSectionComponent,
    MatPaginator
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
}
