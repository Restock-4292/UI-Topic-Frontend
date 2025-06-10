import { Component, ViewChild, OnInit } from '@angular/core';
import { OrdersToolbarComponent } from '../../components/orders-toolbar/orders-toolbar.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { CreateOrdersModalComponent } from '../../components/create-orders-modal/create-orders-modal.component';
import { OrderToSupplierService } from '../../services/order-to-supplier.service';
import { OrderToSupplier } from '../../model/order-to-supplier.entity';
import { ProfileService } from '../../../../profiles/services/profile.service';
import { Profile } from '../../../../profiles/model/profile.entity';
import { UserService } from '../../../../iam/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from '../../components/order-details/order-details-modal.component';


@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [
    OrdersToolbarComponent,
    OrdersTableComponent,
    CreateOrdersModalComponent,
    OrderDetailsModalComponent
  ],
})
export class OrdersComponent implements OnInit {
  orders: OrderToSupplier[] = [];
  filteredOrders: OrderToSupplier[] = [];
  providerProfiles: Profile[] = [];
  supplierOptions: { id: number; name: string }[] = [];
  searchTerm: string = '';
  selectedSupplierId: number | null = null;

  @ViewChild(CreateOrdersModalComponent)
  createOrdersModalComponent!: CreateOrdersModalComponent;

  @ViewChild(OrderDetailsModalComponent) orderDetailsModal!: OrderDetailsModalComponent;
  selectedOrder!: OrderToSupplier;

  constructor(
    private orderService: OrderToSupplierService,
    private userService: UserService,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.loadOrders();
    await this.loadProviderProfiles();
  }

  async loadOrders() {
    this.orders = await this.orderService.getAllEnriched();
    this.filteredOrders = [...this.orders]; // Inicializa con todas
    console.log('Orders loaded:', this.orders);
  }

  async loadProviderProfiles() {
    try {
      const providerUserIds = await this.userService.getSupplierUserIds();
      this.profileService.loadProfilesByUserIds(providerUserIds).subscribe((profiles) => {
        this.providerProfiles = profiles;
        this.supplierOptions = profiles.map(profile => ({
          id: profile.id,
          name: profile.name
        }));
        console.log('Loaded provider profiles:', this.providerProfiles);
      });
    } catch (error) {
      console.error('Error loading provider profiles:', error);
    }
  }

  async onDeleteOrder(orderId: number): Promise<void> {
    await this.orderService.deleteOrder(orderId);
    await this.loadOrders();
  }

  onOpenCreateOrderModal() {
    this.createOrdersModalComponent.openCreateOrderModal();
  }

  onSupplierFilterChanged(supplierId: number | null) {
    this.selectedSupplierId = supplierId;
    this.applyFilters();
  }

  onSearchChanged(term: string): void {
    this.searchTerm = term.trim().toLowerCase();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSupplier = this.selectedSupplierId === null || order.supplier_id === this.selectedSupplierId;

      const supplierName = this.getSupplierName(order.supplier_id).toLowerCase();
      const matchesSearch = supplierName.includes(this.searchTerm);

      return matchesSupplier && matchesSearch;
    });
  }

  getSupplierName(supplierId: number): string {
    const profile = this.providerProfiles.find(p => p.id === supplierId);
    return profile ? profile.name : '';
  }
  openDetails(order: OrderToSupplier): void {
    this.selectedOrder = order;
    this.orderDetailsModal.open();
  }
  onOrderSelected(orderId: number): void {
    const selectedOrder = this.orders.find(order => order.id === orderId);
  }

}
