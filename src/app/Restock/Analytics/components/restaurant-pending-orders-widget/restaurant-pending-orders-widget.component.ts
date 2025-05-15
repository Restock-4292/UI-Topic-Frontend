import {Component} from '@angular/core';
import {Order} from '../../../resource/orders-to-suppliers/model/order.entity';
import {mockOrders} from '../../../../shared/mocks/order.mock';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-restaurant-pending-orders-widget',
  imports: [
    MatTable,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow
  ],
  templateUrl: './restaurant-pending-orders-widget.component.html',
  styleUrl: './restaurant-pending-orders-widget.component.css'
})
export class RestaurantPendingOrdersWidgetComponent {
  orders: Order[] = [];

  displayedColumns: string[] = ['supplier', 'supply', 'quantity', 'unit', 'finalPrice', 'state'];
  mobileColumns: string[] = ['supplier', 'state', 'finalPrice'];

  isMobile = false;

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 800;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }
  getColumns() {
    return this.isMobile ? this.mobileColumns : this.displayedColumns;
  }
  constructor() {
    this.orders = mockOrders.filter(o => o.situation === 'approved');
  }
}
