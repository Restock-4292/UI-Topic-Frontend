export class Recipe {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly total_price: number,
    public readonly image_url: string,
    public readonly user_id: number
) {}

  static fromPersistence(data: any) {
    return new Recipe(
      data.id,
      data.name,
      data.description,
      data.total_price,
      data.image_url,
      data.user_id
    );
  }
}
