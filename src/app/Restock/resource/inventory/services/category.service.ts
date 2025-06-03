import { Injectable } from '@angular/core';
import {BaseService} from '../../../../shared/services/base.service';
import {Category} from '../model/category.entity';
import {environment} from '../../../../../environments/environment.development';
import {firstValueFrom, map} from 'rxjs';
import {CategoryAssembler} from './category.assembler';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService<any> {
  constructor() {
    super();
    this.resourceEndpoint = environment.categoriesEndpointPath;
  }

  async getAllCategories(): Promise<any[]> {
    const response$ = super.getAll();
    const rawDtos = await firstValueFrom(response$);
    return rawDtos.map(CategoryAssembler.toEntity);
  }
}
