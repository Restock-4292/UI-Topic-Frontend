import {Supply} from '../model/supply.entity';

export class CustomSupplyAssembler {
  static toEntity(customDto: any, catalogDto?: any, category?: any): Supply {
    const merged = {
      id: customDto.id,
      supplyId: catalogDto?.id ?? customDto.supplyId ?? customDto.supplyId ?? null,

      user_id: customDto.user_id ?? customDto.userId ?? null,

      name: catalogDto?.name ?? '',
      description: customDto.description ?? catalogDto?.description ?? '',
      perishable: catalogDto?.perishable ?? false,

      min_stock: customDto.min_stock ?? customDto.minStock ?? 0,
      max_stock: customDto.max_stock ?? customDto.maxStock ?? 0,
      price: customDto.price ?? customDto.unitPrice ?? 0,

      category_id:
        catalogDto?.category_id ??
        catalogDto?.categoryId ??
        customDto.category_id ??
        customDto.categoryId ??
        0,

      unit_abbreviation:
        catalogDto?.unit_abbreviation ??
        catalogDto?.unitAbbreviation ??
        '',
    };

    return Supply.fromPersistence(merged, category);
  }


  static toDTO(entity: Supply): any {
    return {
      id: entity.id,
      supplyId: entity.id,
      description: entity.description,
      minStock: entity.min_stock,
      maxStock: entity.max_stock,
      price: entity.price,
      userId: entity.user_id,
    }
  }
}
