import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, forkJoin, map } from 'rxjs';
import { SupplierAssembler } from './supplier.assembler';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private usersUrl = `${environment.serverBaseUrl}${environment.suppliersEndpointPath}`;
private profilesUrl = `${environment.serverBaseUrl}${environment.profilesEndpointPath}`;
private rolesUrl = `${environment.serverBaseUrl}${environment.rolesEndpointPath}`;
private categoriesUrl = `${environment.serverBaseUrl}${environment.businessCategoriesEndpointPath}`;
private profileCategoriesUrl = `${environment.serverBaseUrl}${environment.profilesBusinessCategoriesEndpointPath}`;

constructor(
  private http: HttpClient,
  private assembler: SupplierAssembler
) {}

getAllSuppliers(): Observable<any[]> {
  return forkJoin([
    this.http.get<any[]>(this.usersUrl),
    this.http.get<any[]>(this.profilesUrl),
    this.http.get<any[]>(this.rolesUrl),
    this.http.get<any[]>(this.profileCategoriesUrl),
    this.http.get<any[]>(this.categoriesUrl)
  ]).pipe(
    map(([users, profiles, roles, profileCategoryLinks, businessCategories]) => {
      return this.assembler.toSupplierObjects({
        users,
        profiles,
        roles,
        profileCategoryLinks,
        businessCategories
      });
    })
  );
}
}
