import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment.development';
import {Recipe} from '../model/recipe.entity';
import {BaseService} from '../../../../shared/services/base.service';
import {catchError, map, Observable, retry} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService extends BaseService<Recipe> {
  constructor() {
    super();
    this.resourceEndpoint = environment.recipesEndpointPath;
  }

  override getAll(): Observable<Array<Recipe>>{
    return this.http.get<Array<Recipe>>(this.resourceEndpoint, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  override getById(id: number) {
    return this.http.get<Recipe>(`${this.resourceEndpoint}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this['handleError']));
  }

  override update(id: number, resource: Recipe) {
    return this.http.put<Recipe>(`${this.resourceEndpoint}/${id}`, resource, this.httpOptions)
      .pipe(retry(2), catchError(this['handleError']));
  }
}
