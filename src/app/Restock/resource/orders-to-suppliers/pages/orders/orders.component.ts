import { Component, ViewChild } from '@angular/core';
import { OrdersToolbarComponent } from '../../components/orders-toolbar/orders-toolbar.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { CreateOrdersModalComponent } from '../../components/create-orders-modal/create-orders-modal.component';
import { OrderToSupplierService } from '../../services/order-to-supplier.service';
import { OrderToSupplier } from '../../model/order-to-supplier.entity';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [OrdersToolbarComponent, OrdersTableComponent, CreateOrdersModalComponent],
})
export class OrdersComponent {
  orders: OrderToSupplier[] = [];

  @ViewChild(CreateOrdersModalComponent)
  createOrdersModalComponent!: CreateOrdersModalComponent;

  constructor(private orderService: OrderToSupplierService) {
    this.loadOrders();
  }

  async loadOrders() {
    this.orders = await this.orderService.getAllEnriched();
    console.log('Orders loaded:', this.orders);
  }

  onOpenCreateOrderModal() {
    this.createOrdersModalComponent.openCreateOrderModal();
  }

  // Recibe el evento cuando se selecciona una orden en la tabla
  onOrderSelected(orderId: number): void {
    // Aquí puedes agregar lógica adicional si es necesario
  }

  // Recibe el evento para eliminar una orden
  async onDeleteOrder(orderId: number): Promise<void> {
    await this.orderService.deleteOrder(orderId);
    await this.loadOrders(); // refrescar la lista
  }
}
