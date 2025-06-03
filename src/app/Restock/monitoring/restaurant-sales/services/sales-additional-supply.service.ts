import { Injectable } from '@angular/core';
import { BaseService } from '../../../../shared/services/base.service';
import { environment } from '../../../../../environments/environment';
import { SalesAdditonalSupply } from '../model/sales-additionalSupply.entity';

const salesAdditionalSuppliesResourceEndpointPath = environment.salesAdditionalSupplies;

@Injectable({
    providedIn: 'root'
})
export class SalesRecipeService extends BaseService<SalesAdditonalSupply> {

    constructor() {
        super();
        this.resourceEndpoint = salesAdditionalSuppliesResourceEndpointPath;
    }
}
