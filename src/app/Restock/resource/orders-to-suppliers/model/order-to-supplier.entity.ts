import { OrderToSupplierState } from './order-to-supplier-state.entity';
import { OrderToSupplierSituation } from './order-to-supplier-situation.entity';
import { OrderToSupplierBatch } from './order-to-supplier-batch.entity';

export class OrderToSupplier {
  id: number;
  date: string;
  admin_restaurant_id: number;
  supplier_id: number;
  order_to_supplier_state_id: number;
  order_to_supplier_situation_id: number;
  total_price: number;
  estimated_ship_date?: Date | null;
  estimated_ship_hour?: Date | null;
  partially_accepted: boolean;
  requested_products: number;
  state?: OrderToSupplierState;
  situation?: OrderToSupplierSituation;
  supplies?: OrderToSupplierBatch[];

  constructor(data: Partial<OrderToSupplier> = {}) {
    this.id = data.id || 0;
    this.date = data.date || '';
    this.admin_restaurant_id = data.admin_restaurant_id || 0;
    this.supplier_id = data.supplier_id || 0;
    this.order_to_supplier_state_id = data.order_to_supplier_state_id || 0;
    this.order_to_supplier_situation_id = data.order_to_supplier_situation_id || 0;
    this.total_price = data.total_price || 0;
    this.estimated_ship_date = new Date(data.estimated_ship_date || new Date());
    this.estimated_ship_hour = new Date(data.estimated_ship_hour || new Date());
    this.partially_accepted = data.partially_accepted || false;
    this.requested_products = data.requested_products || 0;
    this.state = data.state;
    this.situation = data.situation;
    this.supplies = data.supplies || [];
  }
}
