import { Injectable } from '@angular/core';
import { BaseService } from '../../../../shared/services/base.service';
import { environment } from '../../../../../environments/environment';
import { SalesAdditionalSupply } from '../model/sales-additionalSupply.entity';

const salesAdditionalSuppliesResourceEndpointPath = environment.salesAdditionalSupplies;

@Injectable({
    providedIn: 'root'
})
export class SalesAdditionalSupplyService extends BaseService<SalesAdditionalSupply> {

    constructor() {
        super();
        this.resourceEndpoint = salesAdditionalSuppliesResourceEndpointPath;
    }
}
