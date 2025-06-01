export class RecipeSupply {
  id?: number;
  recipe_id: number;
  supply_id: number;
  quantity: number;

  constructor(data: {
    id?: number;
    recipe_id: number;
    supply_id: number;
    quantity: number;
  }) {
    this.id = data.id;
    this.recipe_id = data.recipe_id;
    this.supply_id = data.supply_id;
    this.quantity = data.quantity;
  }
}
