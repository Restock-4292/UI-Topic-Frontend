import { OrderToSupplier } from '../model/order-to-supplier.entity';
import { OrderToSupplierState } from '../model/order-to-supplier-state.entity';
import { OrderToSupplierSituation } from '../model/order-to-supplier-situation.entity';

export class OrderToSupplierAssembler {

  static toEntity(
    dto: any,
    state?: OrderToSupplierState,
    situation?: OrderToSupplierSituation
  ): OrderToSupplier {
    const entity = new OrderToSupplier({
      id: dto.id,
      date: dto.date,
      description: dto.description,
      admin_restaurant_id: dto.admin_restaurant_id,
      supplier_id: dto.supplier_id,
      order_to_supplier_state_id: dto.order_to_supplier_state_id,
      order_to_supplier_situation_id: dto.order_to_supplier_situation_id,
      total_price: dto.total_price,
      requested_products_count: dto.requested_products_count,
      partially_accepted: dto.partially_accepted,
      estimated_ship_date: dto.estimated_ship_date ? new Date(dto.estimated_ship_date) : undefined,
      estimated_ship_time: dto.estimated_ship_time ? new Date(dto.estimated_ship_time) : undefined,
    });

    if (state) {
      entity.state = state;
    }
    if (situation) {
      entity.situation = situation;
    }

    return entity;
  }

  static toDTO(entity: OrderToSupplier): any {
    return {
      id: entity.id,
      date: entity.date,
      description: entity.description,
      admin_restaurant_id: entity.admin_restaurant_id,
      supplier_id: entity.supplier_id,
      order_to_supplier_state_id: entity.order_to_supplier_state_id,
      order_to_supplier_situation_id: entity.order_to_supplier_situation_id,
      requested_products_count: entity.requested_products_count,
      total_price: entity.total_price,
      partially_accepted: entity.partially_accepted,
      estimated_ship_date: entity.estimated_ship_date?.toISOString(),
      estimated_ship_time: entity.estimated_ship_time?.toISOString()
    };
  }
}
