import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {SupplierService} from './supplier.service';
import {map, switchMap, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RestaurantContactService {
  private contactsUrl = `${environment.serverBaseUrl}${environment.restaurantContactsEndpointPath}`;

  constructor(
    private http: HttpClient,
    private supplierService: SupplierService
  ) {
  }

  getRestaurantSuppliers(restaurantId: number) {
    return this.http.get<any[]>(`${this.contactsUrl}?restaurant_id=${restaurantId}`).pipe(
      switchMap((contacts) => {
        const supplierIds = contacts.map((c) => +c.supplier_contact_id);
        return this.supplierService.getAllSuppliers().pipe(
          map((suppliers) =>
            suppliers
              .filter((s) => supplierIds.includes(s.id))
              .map((s) => ({...s, added: true}))
          )
        );
      })
    );
  }

  checkIfExists(restaurantId: number, supplierId: number) {
    return this.http
      .get<any[]>(`${this.contactsUrl}?restaurant_id=${restaurantId}&supplier_contact_id=${supplierId}`)
      .pipe(map((res) => res.length > 0));
  }

  addContact(restaurantId: number, supplierId: number) {
    return this.http.post(this.contactsUrl, {
      restaurant_id: restaurantId,
      supplier_contact_id: supplierId
    });
  }
}
