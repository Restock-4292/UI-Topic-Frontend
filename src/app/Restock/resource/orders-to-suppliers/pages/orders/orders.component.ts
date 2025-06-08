import { Component } from '@angular/core';
import { OrdersToolbarComponent } from '../../components/orders-toolbar/orders-toolbar.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [OrdersToolbarComponent, OrdersTableComponent],
})
export class OrdersComponent {
  // Aquí puedes definir las propiedades y métodos necesarios para el componente de órdenes
  // Por ejemplo, para manejar la visualización de órdenes, selección, etc.

  constructor() {
    // Inicialización si es necesario
  }

  // Métodos para manejar eventos del componente
  onOrderSelected(orderId: number): void {
    // Lógica para manejar la selección de una orden por su ID
  }

  onDeleteOrder(orderId: number): void {
    // Lógica para eliminar una orden por su ID
  }

}