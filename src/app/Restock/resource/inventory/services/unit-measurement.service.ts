import {BaseService} from '../../../../shared/services/base.service';
import {UnitMeasurement} from '../model/unit-measurement.entity';
import {environment} from '../../../../../environments/environment.development';
import {map} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnitMeasurementService extends BaseService<UnitMeasurement> {
  constructor() {
    super();
    this.resourceEndpoint = environment.unitMeasurementsEndpointPath;
  }

  override getAll() {
    return super.getAll().pipe(
      map(data => data.map(u => new UnitMeasurement(u)))
    );
  }
}
