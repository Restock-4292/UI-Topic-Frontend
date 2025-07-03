import { Batch } from '../model/batch.entity';
import { Supply } from '../model/supply.entity';

export class BatchAssembler {
  static toEntity(dto: any, supply?: Supply): Batch {
    return Batch.fromPersistence(dto, supply);
  }

  static toDTO(entity: Batch): any {
    return {
      id: entity.id,
      supplyId: entity.supplyId,
      stock: entity.stock,
      expiration_date: entity.expiration_date,
      user_id: entity.user_id
    };
  }
}
