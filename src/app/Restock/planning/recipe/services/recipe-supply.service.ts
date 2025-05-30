import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {RecipeSupply} from '../model/recipe-supply.entity';
import {BaseService} from '../../../../shared/services/base.service';
import { map, mergeMap, forkJoin, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeSupplyService extends BaseService<RecipeSupply> {

  constructor() {
    super();
    this.resourceEndpoint = environment.recipeSuppliesEndpointPath;
  }

  getByRecipe(recipeId: number) {
    return this.getByQuery('recipe_id', recipeId)
      .pipe(map(data => data.map(rs => new RecipeSupply(rs))));
  }


  bulkCreate(recipeId: number, supplies: { supply_id: number; quantity: number }[]) {
    const requests = supplies.map(s =>
      this.create({
        recipe_id: recipeId,
        supply_id: s.supply_id,
        quantity: s.quantity
      })
    );
    return forkJoin(requests).pipe(map(results => results.map(rs => new RecipeSupply(rs))));
  }

  deleteByRecipe(recipeId: number) {
    return this.getByRecipe(recipeId).pipe(
      mergeMap(existing => {
        if (existing.length === 0) return of([]);
        const deletions = existing.map(rs => this.delete(rs.id));
        return forkJoin(deletions);
      })
    );
  }
}
