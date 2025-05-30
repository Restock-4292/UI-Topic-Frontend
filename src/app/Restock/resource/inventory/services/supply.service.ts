import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment.development';
import {Supply} from '../model/supply.entity';
import {BaseService} from '../../../../shared/services/base.service';
import {map} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupplyService extends BaseService<Supply> {
  constructor() {
    super();
    this.resourceEndpoint = environment.suppliesEndpointPath;
  }

  override getAll() {
    return super.getAll().pipe(
      map((data) => data.map(s => Supply.fromPersistence(s)))
    );
  }

  override getById(id: number) {
    return super.getById(id).pipe(
      map(s => Supply.fromPersistence(s))
    );
  }

  override create(dto: any) {
    return super.create(dto).pipe(
      map(res => Supply.fromPersistence(res))
    );
  }

  override update(id: number, dto: any) {
    return super.update(id, dto).pipe(
      map(res => Supply.fromPersistence(res))
    );
  }
}

