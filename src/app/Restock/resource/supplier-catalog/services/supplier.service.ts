import {Injectable} from '@angular/core';
import {Supplier} from '../model/supplier.entity';
import {environment} from '../../../../../environments/environment';
import {BaseService} from '../../../../shared/services/base.service';

const suppliersResourceEndpointPath = environment.suppliersEndpointPath;


/**
 * Servicio que maneja operaciones CRUD para suppliers,
 * extendiendo la funcionalidad base genérica.
 */
@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<Supplier> {

  constructor() {
    super();
    // Se define el endpoint específico para este recurso
    this.resourceEndpoint = suppliersResourceEndpointPath; // Ej: /api/v1/suppliers
  }
}
