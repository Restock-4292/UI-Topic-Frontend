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
    });

    if(state) {
      entity.state = state;
    }
    if(situation) {
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
    };
  }
}
