
import { Injectable } from '@angular/core';
import { BaseService } from '../../../../shared/services/base.service';
import { environment } from '../../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

import { OrderToSupplierSupply } from '../model/order-to-supplier-supply.entity';
import { OrderToSupplierSupplyAssembler } from './order-to-supplier-supply.assembler';

@Injectable({ providedIn: 'root' })
export class OrderToSupplierSupplyService extends BaseService<OrderToSupplierSupply> {
  constructor() {
    super();
    this.resourceEndpoint = environment.ordersToSupplierSuppliesEndpointPath;
  }

  async getAllSupplies(): Promise<OrderToSupplierSupply[]> {
    const raw = await firstValueFrom(this.getAll());
    return raw.map(dto => OrderToSupplierSupplyAssembler.toEntity(dto));
  }

  async getSupplyByOrder(orderId: number): Promise<OrderToSupplierSupply[]> {
    const raw = await firstValueFrom(this.getByQuery('order_to_supplier_id', orderId));
    return raw.map(dto => OrderToSupplierSupplyAssembler.toEntity(dto));
  }

  async createSupply(supply: OrderToSupplierSupply): Promise<OrderToSupplierSupply> {
    const dto = OrderToSupplierSupplyAssembler.toDTO(supply);
    const created = await firstValueFrom(this.create(dto));
    return OrderToSupplierSupplyAssembler.toEntity(created);
  }

  async updateSupply(id: number, supply: OrderToSupplierSupply): Promise<OrderToSupplierSupply> {
    const dto = OrderToSupplierSupplyAssembler.toDTO(supply);
    const updated = await firstValueFrom(this.update(id, dto));
    return OrderToSupplierSupplyAssembler.toEntity(updated);
  }

  async deleteSupply(id: number): Promise<void> {
    await firstValueFrom(this.delete(id));
  }
}
