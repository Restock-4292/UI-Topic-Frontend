import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BaseService } from '../../../../shared/services/base.service';
import { Supply } from '../model/supply.entity';
import { SupplyAssembler } from './supply.assembler';
import {firstValueFrom, map, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupplyService extends BaseService<any> {
  constructor() {
    super();
    this.resourceEndpoint = environment.suppliesEndpointPath;
  }

  async getAllSupplies(): Promise<Supply[]> {
    const response$ = super.getAll();
    const rawDtos = await firstValueFrom(response$);
    return rawDtos.map(SupplyAssembler.toEntity);
  }


  async getSupplyById(id: number): Promise<Supply> {
    const response$ = super.getById(id);
    const dto = await firstValueFrom(response$);
    return SupplyAssembler.toEntity(dto);
  }

  async createSupply(supply: Supply): Promise<Supply> {
    const dto = SupplyAssembler.toDTO(supply);
    const response$ = super.create(dto);
    const created = await firstValueFrom(response$);
    return SupplyAssembler.toEntity(created);
  }

  async updateSupply(id: number | null, supply: Supply): Promise<Supply> {
    const dto = SupplyAssembler.toDTO(supply);
    const response$ = super.update(id, dto);
    const updated = await firstValueFrom(response$);
    return SupplyAssembler.toEntity(updated);
  }

  async deleteSupply(id: number | null): Promise<void> {
    await firstValueFrom(super.delete(id));
  }
}
