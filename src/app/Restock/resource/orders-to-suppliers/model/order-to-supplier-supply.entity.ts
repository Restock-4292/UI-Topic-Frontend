import { Supply } from "../../inventory/model/supply.entity";

export class OrderToSupplierSupply {
  order_to_supplier_id: number;
  supply_id: number;
  quantity: number;
  accepted: boolean;
  supply?: Supply;

  constructor(data: Partial<OrderToSupplierSupply> = {}) {
    this.order_to_supplier_id = data.order_to_supplier_id || 0;
    this.supply_id = data.supply_id || 0;
    this.quantity = data.quantity || 0;
    this.accepted = data.accepted || false;
    this.supply = data.supply;
  }
}