import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Supplier} from '../model/supplier.entity';

@Injectable({providedIn: 'root'})
export class SupplierService {
  private url = `${environment.serverBaseUrl}${environment.suppliersEndpointPath}`;

  constructor(private http: HttpClient) {
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<any[]>(this.url);
  }
}
