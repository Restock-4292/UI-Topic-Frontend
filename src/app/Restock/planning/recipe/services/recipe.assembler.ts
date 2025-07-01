import {Recipe} from '../model/recipe.entity';

export class RecipeAssembler {
  static toEntity(dto: any): Recipe {
      return Recipe.fromPersistence(dto);
  }

  static toDTO(entity: Recipe): any {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      total_price: entity.total_price,
      image_url: entity.image_url,
      user_id: entity.user_id
    };
  }
}
