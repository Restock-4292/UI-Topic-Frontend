import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment.development';
import {Recipe} from '../model/recipe.entity';
import {BaseService} from '../../../../shared/services/base.service';
import {map} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService extends BaseService<Recipe> {
  constructor() {
    super();
    this.resourceEndpoint = environment.recipesEndpointPath;
  }

  override getAll() {
    return super.getAll().pipe(map(data => data.map(r => new Recipe(r))));
  }

  override getById(id: number) {
    return super.getById(id).pipe(map(r => new Recipe(r)));
  }

  override create(recipe: any) {
    return super.create(recipe).pipe(map(r => new Recipe(r)));
  }

  override update(id: number, recipe: any) {
    return super.update(id, recipe).pipe(map(r => new Recipe(r)));
  }
}
