import { BaseService } from '../../../../shared/services/base.service';
import { Batch } from '../model/batch.entity';
import { BatchAssembler } from './batch.assembler';
import {inject, Injectable} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {environment} from '../../../../../environments/environment.development';
import {SupplyService} from './supply.service';

@Injectable({ providedIn: 'root' })
export class BatchService extends BaseService<Batch> {
  private readonly supplyService = inject(SupplyService);

  constructor() {
    super();
    this.resourceEndpoint = environment.batchesEndpointPath;
  }

  async getAllBatchesWithSupplies(): Promise<Batch[]> {
    const [rawBatches, supplies] = await Promise.all([
      firstValueFrom(super.getAll()),
      this.supplyService.getAllSuppliesEnriched()
    ]);

    return rawBatches.map(b => Batch.fromPersistence(
      b,
      supplies.find(s => s.id === b.supply_id)
    ));
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

