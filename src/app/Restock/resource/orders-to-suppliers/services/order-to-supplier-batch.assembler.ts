import { OrderToSupplierBatch } from '../model/order-to-supplier-batch.entity';

export class OrderToSupplierBatchAssembler {
  static toEntity(dto: any): OrderToSupplierBatch {
    return new OrderToSupplierBatch({
      id: dto.id,
      order_to_supplier_id: dto.order_to_supplier_id,
      batch_id: dto.batch_id,
      quantity: dto.quantity,
      accepted: dto.accepted
    });
  }

  static toDTO(entity: OrderToSupplierBatch): any {
    return {
      id: entity.id,
      order_to_supplier_id: entity.order_to_supplier_id,
      batch_id: entity.batch_id,
      quantity: entity.quantity,
      accepted: entity.accepted
    };
  }
}
