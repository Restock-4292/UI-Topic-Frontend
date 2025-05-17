import { Injectable } from '@angular/core';
import { Subscription } from '../model/subscription.entity';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';

const subscriptionsResourceEndpointPath = environment.subscriptionsEndpointPath;

// Decorador que indica que el servicio puede ser inyectado en cualquier parte de la app
@Injectable({
    providedIn: 'root' // Singleton global
})
export class SubscriptionService extends BaseService<Subscription> { // Hereda funcionalidad CRUD genérica

    constructor() {
        super(); // Llama al constructor de la clase base (BaseService)
        this.resourceEndpoint = subscriptionsResourceEndpointPath; // Cambia el endpoint por defecto al de subscriptions localhost:3000/api/v1/subscriptions
    }
}
