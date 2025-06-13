export class OrderToSupplierSupply {
  order_to_supplier_id: number;
  batch_id: number;
  quantity: number;
  accepted: boolean;

  constructor(data: Partial<OrderToSupplierSupply> = {}) {
    this.order_to_supplier_id = data.order_to_supplier_id || 0;
    this.batch_id = data.batch_id || 0;
    this.quantity = data.quantity || 0;
    this.accepted = data.accepted || false;
  }
}
