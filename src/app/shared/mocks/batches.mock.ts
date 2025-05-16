import {Batch} from '../../Restock/resource/inventory/model/batch.entity';


export const mockBatches: Batch[] = [
  {
    id: 1,
    inventory_id: 1,
    supply_id: 1,
    stock: 50,
    expiration_date: '2025-06-01'
  },
  {
    id: 2,
    inventory_id: 1,
    supply_id: 1,
    stock: 30,
    expiration_date: '2025-03-01'
  }
];
