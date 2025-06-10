import { Injectable, inject } from '@angular/core';
import { BaseService } from '../../../../shared/services/base.service';
import { environment } from '../../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

import { OrderToSupplier } from '../model/order-to-supplier.entity';
import { OrderToSupplierAssembler } from './order-to-supplier.assembler';
import { OrderStateService } from './order-to-supplier-state.service';
import { OrderSituationService } from './order-to-supplier-situation.service';

@Injectable({ providedIn: 'root' })
export class OrderToSupplierService extends BaseService<OrderToSupplier> {
  private readonly stateService = inject(OrderStateService);
  private readonly situationService = inject(OrderSituationService);
  constructor() {
    super();
    this.resourceEndpoint = environment.ordersToSupplierEndpointPath;
  }
  async getAllEnriched(): Promise<OrderToSupplier[]> {
    const [rawOrders, states, situations] = await Promise.all([
      firstValueFrom(this.getAll()),
      this.stateService.getAllStates(),
      this.situationService.getAllSituations(),
    ]);

    return rawOrders.map(raw => {
      const state = states.find(s => s.id === raw.order_to_supplier_state_id);
      const situation = situations.find(s => s.id === raw.order_to_supplier_situation_id);
      return OrderToSupplierAssembler.toEntity(raw, state, situation);
    });
  }
  async getAllOrders(): Promise<OrderToSupplier[]> {
    const rawOrders = await firstValueFrom(this.getAll());
    return rawOrders.map(dto => OrderToSupplierAssembler.toEntity(dto));
  }

  async getOrderById(id: number): Promise<OrderToSupplier> {
    const dto = await firstValueFrom(this.getById(id));
    return OrderToSupplierAssembler.toEntity(dto);
  }

  async createOrder(order: OrderToSupplier): Promise<OrderToSupplier> {
    const dto = OrderToSupplierAssembler.toDTO(order);
    const created = await firstValueFrom(this.create(dto));
    return OrderToSupplierAssembler.toEntity(created);
  }

  async updateOrder(id: number, order: OrderToSupplier): Promise<OrderToSupplier> {
    const dto = OrderToSupplierAssembler.toDTO(order);
    const updated = await firstValueFrom(this.update(id, dto));
    return OrderToSupplierAssembler.toEntity(updated);
  }

  async deleteOrder(id: number): Promise<void> {
    await firstValueFrom(this.delete(id));
  }
}
