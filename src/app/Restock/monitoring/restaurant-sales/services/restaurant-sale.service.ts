import { Injectable } from '@angular/core';
import { BaseService } from '../../../../shared/services/base.service';
import { environment } from '../../../../../environments/environment';
import { RestaurantSale } from '../model/restaurant-sale.entity';

const restaurantSalesResourceEndpointPath = environment.restaurantSales;

@Injectable({
    providedIn: 'root'
})
export class RestaurantSaleService extends BaseService<RestaurantSale> {

    constructor() {
        super();
        this.resourceEndpoint = restaurantSalesResourceEndpointPath;
    }
}
