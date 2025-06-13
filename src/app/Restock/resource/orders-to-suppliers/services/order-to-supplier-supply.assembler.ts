import { OrderToSupplierSupply } from '../model/order-to-supplier-supply.entity';

export class OrderToSupplierSupplyAssembler {
  static toEntity(dto: any): OrderToSupplierSupply {
    return new OrderToSupplierSupply({
      order_to_supplier_id: dto.order_to_supplier_id,
      batch_id: dto.batch_id,
      quantity: dto.quantity,
      accepted: dto.accepted
    });
  }

  static toDTO(entity: OrderToSupplierSupply): any {
    return {
      order_to_supplier_id: entity.order_to_supplier_id,
      batch_id: entity.batch_id,
      quantity: entity.quantity,
      accepted: entity.accepted
    };
  }
}
