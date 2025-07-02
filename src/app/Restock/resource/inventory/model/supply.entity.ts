import { Category } from './category.entity';
import { UnitMeasurement } from './unit-measurement.entity';

export class Supply {
  constructor(
    public readonly id: number | null,
    public readonly user_id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly perishable: boolean,
    public readonly min_stock: number,
    public readonly max_stock: number,
    public readonly price: number,
    public readonly category_id: number,
    public readonly unit_measurement_id: number,
    public readonly category?: Category,
    public readonly unit_measurement?: UnitMeasurement
  ) {}

  static fromPersistence(raw: any, category?: Category, unit?: UnitMeasurement): Supply {
    return new Supply(
      raw.id ?? null,
      raw.user_id ?? raw.userId ?? 0,
      raw.name ?? raw.supplyName ?? '',
      raw.description ?? '',
      raw.perishable ?? raw.isPerishable ?? false,
      raw.min_stock ?? raw.minStock ?? 0,
      raw.max_stock ?? raw.maxStock ?? 0,
      raw.price ?? raw.unitPrice ?? 0,
      raw.category_id ?? raw.categoryId ?? 0,
      raw.unit_measurement_id ?? raw.unitMeasurementId ?? 0,
    );
  }
//test
  static fromForm(data: Omit<Supply, 'id' | 'user_id'>, userId: number): Supply {
    return new Supply(
      null,
      userId,
      data.name,
      data.description,
      data.perishable,
      data.min_stock,
      data.max_stock,
      data.price,
      data.category_id,
      data.unit_measurement_id
    );
  }
}
