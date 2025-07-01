export class RecipeSupply {
  private constructor(
    public readonly recipe_id: number,
    public readonly supply_id: number,
    public readonly quantity: number) {}

  static fromPersistence(data: any): RecipeSupply {
    return new RecipeSupply(
      data.recipe_id,
      data.supply_id,
      data.quantity
    );
  }
}
