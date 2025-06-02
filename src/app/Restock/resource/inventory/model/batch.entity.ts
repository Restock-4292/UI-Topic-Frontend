import {Supply} from './supply.entity';

export class Batch {
  private constructor(
    public readonly id: number | null,
    public readonly inventory_id: number,
    public readonly supply_id: number,
    public readonly stock: number,
    public readonly expiration_date: string | null,
    public readonly supply?: Supply
  ) {}

  static fromPersistence(data: any): Batch {
    return new Batch(
      data.id,
      data.inventory_id,
      data.supply_id,
      data.stock,
      data.expiration_date ?? null
    );
  }

  static fromForm(data: Omit<Batch, 'id' | 'inventory_id'>, inventoryId: number): Batch {
    return new Batch(
      null,
      inventoryId,
      data.supply_id,
      data.stock,
      data.expiration_date ?? null
    );
  }

  static empty(): Batch {
    return new Batch(null, 0, 0, 0, null);
  }

  isExpired(): boolean {
    if (!this.expiration_date) return false;
    return new Date(this.expiration_date) < new Date();
  }
}
