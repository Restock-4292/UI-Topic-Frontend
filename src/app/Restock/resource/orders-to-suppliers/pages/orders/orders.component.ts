import { Component, ViewChild } from '@angular/core';
import { OrdersToolbarComponent } from '../../components/orders-toolbar/orders-toolbar.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { CreateOrdersModalComponent } from '../../components/create-orders-modal/create-orders-modal.component';
import { OrderToSupplierService } from '../../services/order-to-supplier.service';
import { OrderToSupplier } from '../../model/order-to-supplier.entity';
import { ProfileService } from '../../../../profiles/services/profile.service';
import { Profile } from '../../../../profiles/model/profile.entity';
import { UserService } from '../../../../iam/services/user.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [OrdersToolbarComponent, OrdersTableComponent, CreateOrdersModalComponent],
})
export class OrdersComponent {
  orders: OrderToSupplier[] = [];
  providerProfiles: Profile[] = [];

  @ViewChild(CreateOrdersModalComponent)
  createOrdersModalComponent!: CreateOrdersModalComponent;

  constructor(
    private orderService: OrderToSupplierService,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    this.loadOrders();
    this.loadProviderProfiles();
  }

  async loadOrders() {
    this.orders = await this.orderService.getAllEnriched();
    console.log('Orders loaded:', this.orders);
  }

  async loadProviderProfiles() {
    try {
      const providerUserIds = await this.userService.getSupplierUserIds();
      this.profileService.loadProfilesByUserIds(providerUserIds).subscribe((profiles) => {
        this.providerProfiles = profiles;
        console.log('Loaded provider profiles:', this.providerProfiles);
      });
    } catch (error) {
      console.error('Error loading provider profiles:', error);
    }
  }

  onOpenCreateOrderModal() {
    this.createOrdersModalComponent.openCreateOrderModal();
  }

  onOrderSelected(orderId: number): void {
    // lógica adicional
  }

  async onDeleteOrder(orderId: number): Promise<void> {
    await this.orderService.deleteOrder(orderId);
    await this.loadOrders(); // refrescar lista
  }
}
