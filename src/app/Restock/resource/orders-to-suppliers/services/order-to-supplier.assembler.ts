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
      admin_restaurant_id: dto.admin_restaurant_id,
      supplier_id: dto.supplier_id,
      order_to_supplier_state_id: dto.order_to_supplier_state_id,
      order_to_supplier_situation_id: dto.order_to_supplier_situation_id,
      total_price: dto.total_price,
      partially_accepted: dto.partially_accepted,
      estimated_ship_date: dto.estimated_ship_date ? new Date(dto.estimated_ship_date) : undefined,
      estimated_ship_hour: dto.estimated_ship_hour ? new Date(dto.estimated_ship_hour) : undefined,
      requested_products: dto.requested_products || 0
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
      admin_restaurant_id: entity.admin_restaurant_id,
      supplier_id: entity.supplier_id,
      order_to_supplier_state_id: entity.order_to_supplier_state_id,
      order_to_supplier_situation_id: entity.order_to_supplier_situation_id,
      total_price: entity.total_price,
      partially_accepted: entity.partially_accepted,
      estimated_ship_date: entity.estimated_ship_date?.toISOString(),
      estimated_ship_hour: entity.estimated_ship_hour?.toISOString(),
      requested_products: entity.requested_products
    };
  }
}
