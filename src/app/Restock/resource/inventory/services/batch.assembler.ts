import { Batch } from '../model/batch.entity';
import {Supply} from '../model/supply.entity';

export class BatchAssembler {
  static toEntity(dto: any, supply?: Supply): Batch {
    return Batch.fromPersistence(dto);
  }

  static toDTO(entity: Batch): any {
    return {
      id: entity.id,
      inventory_id: entity.inventory_id,
      supply_id: entity.supply_id,
      stock: entity.stock,
      expiration_date: entity.expiration_date
    };
  }
}
