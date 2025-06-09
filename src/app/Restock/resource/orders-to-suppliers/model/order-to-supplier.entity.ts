/* export class OrderToSupplier {
  id: number;
  date: string;
  admin_restaurant_id: number;
  supplier_id: number;
  order_to_supplier_state_id: number;
  order_to_supplier_situation_id: number;
  total_price: number;
  partially_accepted: boolean;

  constructor(data: Partial<OrderToSupplier> = {}) {
    this.id = data.id || 0;
    this.date = data.date || '';
    this.admin_restaurant_id = data.admin_restaurant_id || 0;
    this.supplier_id = data.supplier_id || 0;
    this.order_to_supplier_state_id = data.order_to_supplier_state_id || 0;
    this.order_to_supplier_situation_id = data.order_to_supplier_situation_id || 0;
    this.total_price = data.total_price || 0;
    this.partially_accepted = data.partially_accepted || false;
  }
}
 */
import { OrderToSupplierState } from './order-to-supplier-state.entity';
import { OrderToSupplierSituation } from './order-to-supplier-situation.entity';

export class OrderToSupplier {
  id: number;
  date: string;
  admin_restaurant_id: number;
  supplier_id: number;
  order_to_supplier_state_id: number;
  order_to_supplier_situation_id: number;
  total_price: number;
  partially_accepted: boolean;
  state?: OrderToSupplierState;
  situation?: OrderToSupplierSituation;

  constructor(data: Partial<OrderToSupplier> = {}) {
    this.id = data.id || 0;
    this.date = data.date || '';
    this.admin_restaurant_id = data.admin_restaurant_id || 0;
    this.supplier_id = data.supplier_id || 0;
    this.order_to_supplier_state_id = data.order_to_supplier_state_id || 0;
    this.order_to_supplier_situation_id = data.order_to_supplier_situation_id || 0;
    this.total_price = data.total_price || 0;
    this.partially_accepted = data.partially_accepted || false;

    this.state = data.state;
    this.situation = data.situation;
  }
}
