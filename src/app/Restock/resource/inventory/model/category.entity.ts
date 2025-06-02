export class Category {
  private constructor(
    public readonly id: number,
    public readonly name: string
  ) {}

  static fromPersistence(data: any): Category {
    return new Category(
      data.id,
      data.name
    );
  }

  static fromForm(data: Omit<Category, 'id'>): Category {
    return new Category(
      Math.floor(Math.random() * 100000), // o null si el backend genera el ID
      data.name
    );
  }
}
