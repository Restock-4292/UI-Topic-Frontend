import { Role } from './role.entity';

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: string,
    public readonly role_id: number,
    public readonly subscription_id: number,
    public readonly start_date: string,
    public readonly subscription_payment_details_id: number,
    public readonly role?: Role
  ) {}

  static fromPersistence(raw: any, role?: Role): User {
    return new User(
      raw.id,
      raw.email,
      raw.password,
      raw.role_id,
      raw.subscription_id,
      raw.start_date,
      raw.subscription_payment_details_id,
      role
    );
  }
}
