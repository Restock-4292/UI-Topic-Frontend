import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BaseService } from '../../../../shared/services/base.service';
import { Supply } from '../model/supply.entity';
import { SupplyAssembler } from './supply.assembler';
import { firstValueFrom, map, Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { BatchService } from './batch.service';

@Injectable({ providedIn: 'root' })
export class SupplyService extends BaseService<any> {

  private readonly categoryService = inject(CategoryService);
  private readonly batchService = inject(BatchService);

  constructor() {
    super();
    this.resourceEndpoint = environment.suppliesEndpointPath;
  }

  async getAllSuppliesEnriched(): Promise<Supply[]> {
    const [rawSupplies, categories] = await Promise.all([
      firstValueFrom(super.getAll()),
      this.categoryService.getAllCategories()
    ]);

    return rawSupplies.map(raw => {
      const category = categories.find(c => c.id === raw.category_id);
      return Supply.fromPersistence(raw, category);
    });
  }

  async getSuppliesEnrichedByUserIds(userIds: number[]): Promise<Supply[]> {
    const [rawSupplies, categories, rawBatches] = await Promise.all([
      firstValueFrom(super.getAll()),
      this.categoryService.getAllCategories(),
      firstValueFrom(this.batchService.getAll())
    ]);

    const filteredSupplies = rawSupplies.filter(supply =>
      userIds.includes(supply.user_id)
    );

    return filteredSupplies.map(raw => {
      const category = categories.find(c => c.id === raw.category_id);

      const supply = Supply.fromPersistence(raw, category);

      const relatedBatches = rawBatches.filter(
        b => b.supplyId === raw.id && b.user_id === raw.user_id
      );

      (supply as any).batches = relatedBatches;

      return supply;
    });
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

  async updateSupply(id: string | number | null, supply: Supply): Promise<Supply> {
    const dto = SupplyAssembler.toDTO(supply);
    const response$ = super.update(id, dto);
    const updated = await firstValueFrom(response$);
    return SupplyAssembler.toEntity(updated);
  }

  async deleteSupply(id: string | number | null): Promise<void> {
    await firstValueFrom(super.delete(id));
  }
}
