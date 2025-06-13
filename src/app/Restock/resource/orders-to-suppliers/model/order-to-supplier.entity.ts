import { OrderToSupplierState } from './order-to-supplier-state.entity';
import { OrderToSupplierSituation } from './order-to-supplier-situation.entity';
import { OrderToSupplierBatch } from './order-to-supplier-batch.entity';

export class OrderToSupplier {
  id: number;
  date: string;
  description: string;
  admin_restaurant_id: number;
  estimated_ship_date: Date;
  estimated_ship_time: Date;
  supplier_id: number;
  order_to_supplier_state_id: number;
  order_to_supplier_situation_id: number;
  total_price: number;
  requested_products_count: number;
  partially_accepted: boolean;
  state?: OrderToSupplierState;
  situation?: OrderToSupplierSituation;
  supplies?: OrderToSupplierBatch[];

  constructor(data: Partial<OrderToSupplier> = {}) {
    this.id = data.id || 0;
    this.date = data.date || '';
    this.description = data.description || '';
    this.estimated_ship_date = data.estimated_ship_date ? new Date(data.estimated_ship_date) : new Date();
    this.estimated_ship_time = data.estimated_ship_time ? new Date(data.estimated_ship_time) : new Date();
    this.admin_restaurant_id = data.admin_restaurant_id || 0;
    this.supplier_id = data.supplier_id || 0;
    this.order_to_supplier_state_id = data.order_to_supplier_state_id || 0;
    this.order_to_supplier_situation_id = data.order_to_supplier_situation_id || 0;
    this.total_price = data.total_price || 0;
    this.requested_products_count = data.requested_products_count || 0;
    this.partially_accepted = data.partially_accepted || false;
    this.state = data.state;
    this.situation = data.situation;
    this.supplies = data.supplies || [];
  }
}
