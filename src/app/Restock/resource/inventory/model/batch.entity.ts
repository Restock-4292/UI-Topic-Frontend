import { Supply } from './supply.entity';

export class Batch {
  private constructor(
    public readonly id: number | null,
    public readonly supplyId: number,
    public stock: number,
    public readonly expiration_date: string | null,
    public readonly user_id: number,
    public readonly supply?: Supply
  ) { }

  static fromPersistence(data: any, supply?: Supply): Batch {
    return new Batch(
      data.id,
      data.supplyId,
      data.stock,
      data.expiration_date ?? null,
      data.user_id,
      supply
    );
  }


  static fromForm(data: Omit<Batch, 'id' | 'user_id'>, userId: number): Batch {
    return new Batch(
      null,
      data.supplyId,
      data.stock,
      data.expiration_date ?? null,
      userId
    );
  }

  static empty(): Batch {
    return new Batch(null, 0, 0, null, 0);
  }

  isExpired(): boolean {
    if (!this.expiration_date) return false;
    return new Date(this.expiration_date) < new Date();
  }
}
