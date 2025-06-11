import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BaseService } from '../../../../shared/services/base.service';
import { Supply } from '../model/supply.entity';
import { SupplyAssembler } from './supply.assembler';
import { firstValueFrom, map, Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { UnitMeasurementService } from './unit-measurement.service';

@Injectable({ providedIn: 'root' })
export class SupplyService extends BaseService<any> {

  private readonly categoryService = inject(CategoryService);
  private readonly unitService = inject(UnitMeasurementService);

  constructor() {
    super();
    this.resourceEndpoint = environment.suppliesEndpointPath;
  }

  async getAllSuppliesEnriched(): Promise<Supply[]> {
    const [rawSupplies, categories, units] = await Promise.all([
      firstValueFrom(super.getAll()),
      this.categoryService.getAllCategories(),
      this.unitService.getAllUnitMeasurements()
    ]);

    return rawSupplies.map(raw => {
      const category = categories.find(c => c.id === raw.category_id);
      const unit = units.find(u => u.id === raw.unit_measurement_id);
      return Supply.fromPersistence(raw, category, unit);
    });
  }

  async getSuppliesEnrichedByUserIds(userIds: number[]): Promise<Supply[]> {
    const [rawSupplies, categories, units] = await Promise.all([
      firstValueFrom(super.getAll()),
      this.categoryService.getAllCategories(),
      this.unitService.getAllUnitMeasurements()
    ]);

    const filteredSupplies = rawSupplies.filter(supply =>
      userIds.includes(supply.user_id)
    );
    return filteredSupplies.map(raw => {
      const category = categories.find(c => c.id === raw.category_id);
      const unit = units.find(u => u.id === raw.unit_measurement_id);
      return Supply.fromPersistence(raw, category, unit);
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
