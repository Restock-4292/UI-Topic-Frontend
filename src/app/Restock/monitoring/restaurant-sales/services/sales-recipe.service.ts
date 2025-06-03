import { Injectable } from '@angular/core';
import { BaseService } from '../../../../shared/services/base.service';
import { environment } from '../../../../../environments/environment';
import { SalesRecipe } from '../model/sales-recipe.entity';

const salesRecipesResourceEndpointPath = environment.salesRecipes;

@Injectable({
    providedIn: 'root'
})
export class SalesRecipeService extends BaseService<SalesRecipe> {

    constructor() {
        super();
        this.resourceEndpoint = salesRecipesResourceEndpointPath;
    }
}
