import { Injectable } from '@angular/core';
import {BaseService} from '../../../../shared/services/base.service';
import {Category} from '../model/category.entity';
import {environment} from '../../../../../environments/environment.development';
import {map} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService<Category> {
  constructor() {
    super();
    this.resourceEndpoint = environment.categoriesEndpointPath;
  }

  override getAll() {
    return super.getAll().pipe(
      map(data => data.map(c => new Category(c)))
    );
  }
}
