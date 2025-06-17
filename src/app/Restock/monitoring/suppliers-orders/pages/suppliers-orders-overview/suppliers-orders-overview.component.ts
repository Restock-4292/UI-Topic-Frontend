import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {NewOrdersComponent} from '../../components/new-orders/new-orders.component';
import {ApprovedOrdersComponent} from '../../components/approved-orders/approved-orders.component';
import {DeliveredOrdersComponent} from '../../components/delivered-orders/delivered-orders.component';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {Profile} from '../../../../profiles/model/profile.entity';
import {Supply} from '../../../../resource/inventory/model/supply.entity';
import {OrderToSupplierService} from '../../../../resource/orders-to-suppliers/services/order-to-supplier.service';
import {BatchService} from '../../../../resource/inventory/services/batch.service';
import {UserService} from '../../../../iam/services/user.service';
import {ProfileService} from '../../../../profiles/services/profile.service';
import {OrderToSupplierBatch} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-batch.entity';
import {
  OrderToSupplierBatchService
} from '../../../../resource/orders-to-suppliers/services/order-to-supplier-batch.service';
import {DeleteComponent} from '../../../../../shared/components/delete/delete.component';
import {BaseModalService} from '../../../../../shared/services/base-modal.service';
import {firstValueFrom} from 'rxjs';
import {OrderToSupplierState} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-state.entity';
import {
  OrderToSupplierSituation
} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-situation.entity';
import {ManageNewOrdersComponent} from '../../components/manage-new-orders/manage-new-orders.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  batchesGroupedByOrder: { orderId: number; batches: OrderToSupplierBatch[] }[] = [];
  deliveredOrders: Array<OrderToSupplier> = [];
  ordersInProcess: Array<OrderToSupplier> = [];
  newOrders: Array<OrderToSupplier> = [];

  @ViewChild(DeleteComponent) orderDeclineModal!: DeleteComponent;

  selectedOrder: OrderToSupplier | null = null;
  detailedSuppliesPerOrder: Supply[] = [];
  batchesPerOrder: OrderToSupplierBatch[] = [];
  restaurantNameOrderSelected: string = '';

  constructor(
    private orderService: OrderToSupplierService,
    private orderToSupplierBatchService: OrderToSupplierBatchService,
    private batchService: BatchService,
    private userService: UserService,
    private profileService: ProfileService,
    private modalService: BaseModalService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.loadOrders();
    await this.loadGroupedSupplies();
    await this.loadUsersAndProfiles();
  }

  buildRestaurantNameMap() {
    this.restaurantNameMap = {};

    this.orders.forEach(order => {
      const profile = this.adminRestaurantsProfiles.find(p => Number(p.id) === Number(order.admin_restaurant_id));
      this.restaurantNameMap[order.id] = profile?.business_name ?? 'Unknown Restaurant';
    });
  }

  async loadOrders() {
    this.orders = await this.orderService.getAllEnriched();
    console.log('Orders loaded:', this.orders);

    // Filter delivered orders
    this.deliveredOrders = this.orders.filter(order =>
      order.state?.name.toLowerCase() === 'delivered'
    );

    // Filter orders in process: situation = approved && state != delivered
    this.ordersInProcess = this.orders.filter(order =>
      order.situation?.name.toLowerCase() === 'approved' &&
      order.state?.name.toLowerCase() !== 'delivered'
    );

    this.newOrders = this.orders.filter(order =>
      order.situation?.name.toLowerCase() === 'pending'
    );

    console.log('Delivered Orders:', this.deliveredOrders);
    console.log('Orders In Process:', this.ordersInProcess);
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
          const orderBatches = order.orderBatches || await this.orderToSupplierBatchService.getSupplyByOrder(order.id);

          // supplyGroupedByOrder: original list
          const supplyGroup = {
            orderId: order.id,
            batches: orderBatches,
          };

          // detailedSuppliesGroupedByOrder: list with detailed supply information of each batch
          const detailedGroup = {
            orderId: order.id,
            supplies: orderBatches
              .map(ob => {
                const batch = batches.find(b => Number(b.id) === Number(ob.batch_id));

                return batch? batch.supply : null;
              })
              .filter((s): s is Supply => s !== null),
          };

          return { supplyGroup, detailedGroup };
        })
      );

      // Map the results to the component properties
      this.batchesGroupedByOrder = result.map(r => r.supplyGroup);
      this.detailedSuppliesGroupedByOrder = result.map(r => r.detailedGroup);

      console.log('Supplies grouped:', this.batchesGroupedByOrder);
      console.log('Detailed supplies grouped:', this.detailedSuppliesGroupedByOrder);

    } catch (error) {
      console.error('Error loading grouped supplies:', error);
    }
  }

  //MODALS METHODS
  openDeleteOrderDialog(order: OrderToSupplier, action: string): void {
    let titleContent = '';
    let newIdSituation = 0; // Default situation ID

    if(action === 'decline')
    {
      titleContent = 'Decline Order';
      newIdSituation = 3; // ID of "Declined"
    }
    else
    {
      titleContent = 'Cancel Order';
      newIdSituation = 4; // ID of "Cancelled"
    }

    this.modalService.open({
      title: titleContent,
      contentComponent: DeleteComponent,
      width: '25rem',
      label: action + ' this order',
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          const updatedOrder: OrderToSupplier = {
            id: order.id,
            date: order.date,
            description: order.description,
            estimated_ship_date: order.estimated_ship_date,
            estimated_ship_time: order.estimated_ship_time,
            admin_restaurant_id: order.admin_restaurant_id,
            supplier_id: order.supplier_id,
            order_to_supplier_state_id: 1, // ID of "On Hold"
            order_to_supplier_situation_id: newIdSituation, // ID of "Declined"
            requested_products_count: order.requested_products_count,
            total_price: order.total_price,
            partially_accepted: order.partially_accepted
          };

          await firstValueFrom(this.orderService.update(order.id, updatedOrder));

          // Reload all data to ensure UI consistency
          await this.loadOrders();
          await this.loadGroupedSupplies();

          console.log('Order updated successfully');
        } catch (error) {
          console.error('Error updating order situation to Declined:', error);
        }
      }
    });
  }



  getDetailedOrderSupplies(orderId: number): Supply[] {
    const orderGroup = this.detailedSuppliesGroupedByOrder.find(group =>
      Number(group.orderId) === Number(orderId)
    );
    return orderGroup ? orderGroup.supplies : [];
  }

  getOrderBatches(orderId: number) {
    const orderGroup = this.batchesGroupedByOrder.find(group =>
      Number(group.orderId) === Number(orderId)
    );
    console.log('Batches for order ID', orderId, ':', orderGroup?.batches);
    return orderGroup ? orderGroup.batches : [];

  }

  openManageOrdersModal(order: OrderToSupplier): void {
    this.detailedSuppliesPerOrder = this.getDetailedOrderSupplies(order.id);
    this.batchesPerOrder = this.getOrderBatches(order.id);
    this.selectedOrder = order;
    this.restaurantNameOrderSelected = this.restaurantNameMap[order.id] || '';

    // Abrir el modal usando BaseModalService
    const dialogRef = this.modalService.open({
      title: 'New Order Management',
      contentComponent: ManageNewOrdersComponent,
      width: '40vw',
      height: '90vh',
      description: 'Complete the order details to start tracking your order',
      initialData: {
        order: order,
        suppliesDetailsOfOrder: this.detailedSuppliesPerOrder,
        batchesOfOrder: this.batchesPerOrder,
        adminRestaurantName: this.restaurantNameOrderSelected
      }
    });

    setTimeout(() => {
      const instance = dialogRef.componentInstance
        .contentComponentRef?.instance as ManageNewOrdersComponent;

      instance?.acceptSelection.subscribe((order) => {
        console.log('¡Padre/abuelo recibió el order!', order);
        try {
          console.log('Padre recibió order:', order);
          // Marcar lotes como aceptados
          order.orderBatches?.forEach(orderBatch => (orderBatch.accepted = true));

          // Actualizar estado y situación
          order.state = new OrderToSupplierState({ id: 1, name: 'On Hold' });
          order.situation = new OrderToSupplierSituation({ id: 2, name: 'Approved' });

          // Hacer update con await porque tu servicio es async
           this.orderService.updateOrder(order.id, order);

          this.snackBar.open('Order updated successfully', 'Close', { duration: 3000 });
          dialogRef.close();
           this.loadOrders();
        } catch (error) {
          console.error('Error updating order:', error);
          this.snackBar.open('Failed to update order', 'Close', { duration: 3000 });
        }
      });
    });


    // Opcional: manejar el cierre del modal
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
    });
  }
}

