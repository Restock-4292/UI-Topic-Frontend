import { Batch } from '../model/batch.entity';
import { Supply } from '../model/supply.entity';

export class BatchAssembler {
  static toEntity(dto: any, supply?: Supply): Batch {
    return Batch.fromPersistence(dto, supply);
  }

  static toDTO(entity: Batch): any {
    return {
      id: entity.id,
      supply_id: entity.supply_id,
      stock: entity.stock,
      expiration_date: entity.expiration_date,
      user_id: entity.user_id
    };
  }
}
