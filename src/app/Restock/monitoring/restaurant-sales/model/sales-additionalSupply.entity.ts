
export class SalesAdditonalSupply {
    sale_id: number;
    supply_id: number;
    quantity: number;

    constructor(salesAdditionalSupply: {
        sale_id?: number,
        supply_id?: number,
        quantity?: number,
    }) {
        this.sale_id = salesAdditionalSupply.sale_id || 0;
        this.supply_id = salesAdditionalSupply.supply_id || 0;
        this.quantity = salesAdditionalSupply.quantity || 0;
    }
}
