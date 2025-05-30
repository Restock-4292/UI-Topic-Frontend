export class Supply {
  private constructor(
    public readonly id: number,
    public readonly description: string,
    public readonly perishable: boolean,
    public readonly min_stock: number,
    public readonly max_stock: number,
    public readonly price: number,
    public readonly category_id: number,
    public readonly unit_measurement_id: number,
    public readonly user_id: number
  ) {}

  // Factory para creación desde la base de datos
  static fromPersistence(data: any): Supply {
    return new Supply(
      data.id,
      data.description,
      data.perishable,
      data.min_stock,
      data.max_stock,
      data.price,
      data.category_id,
      data.unit_measurement_id,
      data.user_id
    );
  }

  // Factory para creación desde un formulario
  static fromForm(data: Omit<Supply, 'id' | 'user_id'>, userId: number): Supply {
    return new Supply(
      Math.floor(Math.random() * 100000), // o null si el backend genera el ID
      data.description,
      data.perishable,
      data.min_stock,
      data.max_stock,
      data.price,
      data.category_id,
      data.unit_measurement_id,
      userId
    );
  }
}
