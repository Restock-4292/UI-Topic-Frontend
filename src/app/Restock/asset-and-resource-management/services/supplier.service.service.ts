import { Injectable } from '@angular/core';
import {Supplier} from '../model/supplier.entity';
import {SUPPLIER_LIST} from '../../../shared/mocks/supplier.mock';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliers: Supplier[] = SUPPLIER_LIST;

  getAll(): Observable<Supplier[]> {
    return of(this.suppliers);
  }

  getById(id: number): Observable<Supplier | undefined> {
    const supplier = this.suppliers.find(s => s.id === id);
    return of(supplier);
  }

  addToMySuppliers(supplier: Supplier): Observable<boolean> {
    // Aquí podrías guardar en otra lista, por ahora simula como añadido
    return of(true);
  }

  constructor() { }
}
