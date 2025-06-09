import { OrderToSupplierSupply } from '../model/order-to-supplier-supply.entity';

export class OrderToSupplierSupplyAssembler {
  static toEntity(dto: any): OrderToSupplierSupply {
    return new OrderToSupplierSupply({
      order_to_supplier_id: dto.order_to_supplier_id,
      supply_id: dto.supply_id,
      quantity: dto.quantity,
      accepted: dto.accepted
    });
  }

  static toDTO(entity: OrderToSupplierSupply): any {
    return {
      order_to_supplier_id: entity.order_to_supplier_id,
      supply_id: entity.supply_id,
      quantity: entity.quantity,
      accepted: entity.accepted
    };
  }
}
