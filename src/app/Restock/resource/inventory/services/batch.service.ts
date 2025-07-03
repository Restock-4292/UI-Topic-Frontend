import {BaseService} from '../../../../shared/services/base.service';
import {Batch} from '../model/batch.entity';
import {BatchAssembler} from './batch.assembler';
import {Injectable, Injector} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../../../environments/environment.development';
import {CustomSupplyService} from './custom-supply.service';
import {CustomSupplyAssembler} from './custom-supply.assembler';

@Injectable({ providedIn: 'root' })
export class BatchService extends BaseService<Batch> {
  private readonly injector: Injector;

  constructor(injector: Injector) {
    super();
    this.resourceEndpoint = environment.batchesEndpointPath;
    this.injector = injector;
  }

  private get supplyService(): CustomSupplyService {
    return this.injector.get(CustomSupplyService);
  }

  async getAllBatchesWithSupplies(): Promise<Batch[]> {
    const rawBatches = await firstValueFrom(this.getAll());
    const supplies = await this.supplyService.getAll();

    return rawBatches.map(b =>
      Batch.fromPersistence(
        b,
        supplies.find(s => s.id === b.supplyId)
      )
    );
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
