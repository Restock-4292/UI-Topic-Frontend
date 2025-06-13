import {Component, Input, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {NewOrdersComponent} from '../../components/new-orders/new-orders.component';
import {ApprovedOrdersComponent} from '../../components/approved-orders/approved-orders.component';
import {DeliveredOrdersComponent} from '../../components/delivered-orders/delivered-orders.component';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {Profile} from '../../../../profiles/model/profile.entity';
import {OrderToSupplierSupply} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-supply.entity';
import {Supply} from '../../../../resource/inventory/model/supply.entity';
import {OrderToSupplierService} from '../../../../resource/orders-to-suppliers/services/order-to-supplier.service';
import {
  OrderToSupplierSupplyService
} from '../../../../resource/orders-to-suppliers/services/order-to-supplier-supply.service';
import {BatchService} from '../../../../resource/inventory/services/batch.service';
import {UserService} from '../../../../iam/services/user.service';
import {ProfileService} from '../../../../profiles/services/profile.service';

@Component({
  selector: 'app-suppliers-orders-overview',
  imports: [
    MatTabsModule,
    NewOrdersComponent,
    ApprovedOrdersComponent,
    DeliveredOrdersComponent
  ],
  templateUrl: './suppliers-orders-overview.component.html',
  styleUrl: './suppliers-orders-overview.component.css'
})
export class SuppliersOrdersOverviewComponent implements OnInit {
    orders: Array<OrderToSupplier> = [];
  readonly adminRestaurantsProfiles: Profile[] = [];


  restaurantNameMap: { [orderId: number]: string } = {};
  detailedSuppliesGroupedByOrder: { orderId: number; supplies: Supply[] }[] = [];
  suppliesGroupedByOrder: { orderId: number; supplies: OrderToSupplierSupply[] }[] = [];

  constructor(
    private orderService: OrderToSupplierService,
    private orderToSupplierSupplyService: OrderToSupplierSupplyService,
    private batchService: BatchService,
    private userService: UserService,
    private profileService: ProfileService,
  ) { }

  async ngOnInit() {
    await this.loadOrders();
    await this.loadGroupedSupplies();
    await this.loadUsersAndProfiles();
  }

  buildRestaurantNameMap() {
    this.restaurantNameMap = {};

    this.orders.forEach(order => {
      const profile = this.adminRestaurantsProfiles.find(p => p.id === order.admin_restaurant_id);
      this.restaurantNameMap[order.id] = profile?.companyName ?? 'Unknown Restaurant';
    });
  }


  async loadOrders() {
    this.orders = await this.orderService.getAllEnriched();
    console.log('Orders loaded:', this.orders);
  }

  async loadUsersAndProfiles() {
    const restaurantUsersId = await this.userService.getRestaurantAdminUserIds();

    this.profileService.loadProfilesByUserIds(restaurantUsersId).subscribe((profiles) => {
      this.adminRestaurantsProfiles.splice(0, this.adminRestaurantsProfiles.length, ...profiles);
      console.log('Loaded restaurant profiles:', this.adminRestaurantsProfiles);

      this.buildRestaurantNameMap();
    });
  }


  async loadGroupedSupplies() {
    try {
      const batches = await this.batchService.getAllBatchesWithSupplies();

      const result = await Promise.all(
        this.orders.map(async (order) => {
          const orderSupplies = await this.orderToSupplierSupplyService.getSupplyByOrder(order.id);

          // supplyGroupedByOrder: directamente la lista original
          const supplyGroup = {
            orderId: order.id,
            supplies: orderSupplies,
          };

          // detailedSuppliesGroupedByOrder: la lista de Supply a partir del batch
          const detailedGroup = {
            orderId: order.id,
            supplies: orderSupplies
              .map(os => {
                const batch = batches.find(b => b.id === os.batch_id);
                return batch?.supply || null;
              })
              .filter((s): s is Supply => s !== null),
          };

          return { supplyGroup, detailedGroup };
        })
      );

      // Separar los resultados
      this.suppliesGroupedByOrder = result.map(r => r.supplyGroup);
      this.detailedSuppliesGroupedByOrder = result.map(r => r.detailedGroup);

      console.log('Supplies grouped:', this.suppliesGroupedByOrder);
      console.log('Detailed supplies grouped:', this.detailedSuppliesGroupedByOrder);

    } catch (error) {
      console.error('Error loading grouped supplies:', error);
    }
  }


}

