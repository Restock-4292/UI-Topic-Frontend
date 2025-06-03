import {BaseService} from '../../../../shared/services/base.service';
import {UnitMeasurement} from '../model/unit-measurement.entity';
import {environment} from '../../../../../environments/environment.development';
import {firstValueFrom, map} from 'rxjs';
import {Injectable} from '@angular/core';
import {UnitMeasurementAssembler} from './unit-measurement.assembler';

@Injectable({ providedIn: 'root' })
export class UnitMeasurementService extends BaseService<UnitMeasurement> {
  constructor() {
    super();
    this.resourceEndpoint = environment.unitMeasurementsEndpointPath
  }

  async getAllUnitMeasurements(): Promise<UnitMeasurement[]> {
    const response$ = super.getAll();
    const rawDtos = await firstValueFrom(response$);
    return rawDtos.map(UnitMeasurementAssembler.toEntity);
  }
}

