import { BaseService } from '../../../../shared/services/base.service';
import { Batch } from '../model/batch.entity';
import { BatchAssembler } from './batch.assembler';
import {inject, Injectable} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {environment} from '../../../../../environments/environment.development';
import {SupplyAssembler} from './supply.assembler';
import {Supply} from '../model/supply.entity';

@Injectable({ providedIn: 'root' })
export class BatchService extends BaseService<Batch> {
  constructor() {
    super();
    this.resourceEndpoint = environment.batchesEndpointPath;
  }

  async getAllBatches(supplies: Supply[]): Promise<Batch[]> {
    const rawDtos = await firstValueFrom(super.getAll());
    return rawDtos.map(dto => {
      const relatedSupply = supplies.find(s => s.id === dto.supply_id);
      return BatchAssembler.toEntity(dto, relatedSupply);
    });
  }



  async createBatch(batch: Batch): Promise<Batch> {
    const dto = BatchAssembler.toDTO(batch);
    const response$ = super.create(dto);
    const raw = await firstValueFrom(response$);
    return BatchAssembler.toEntity(raw);
  }

  async deleteBatch(id: number | null): Promise<void> {
    await firstValueFrom(super.delete(id));
  }

  async updateBatch(id: number | null, batch: Batch): Promise<Batch> {
    const dto = BatchAssembler.toDTO(batch);
    const response$ = super.update(id, dto);
    const updated = await firstValueFrom(response$);
    return BatchAssembler.toEntity(updated);
  }
}

