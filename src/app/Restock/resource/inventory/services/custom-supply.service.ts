import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, retry, throwError } from 'rxjs';
import { CategoryService } from './category.service';
import { UnitMeasurementService } from './unit-measurement.service';
import { Supply } from '../model/supply.entity';
import {environment} from '../../../../../environments/environment.development';

export interface CustomSupplyPayload {
  supplyId: string;
  minStock: number;
  maxStock: number;
  unitPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomSupplyService {
  private http = inject(HttpClient);
  private categories = inject(CategoryService);
  private units = inject(UnitMeasurementService);
  private baseUrl = environment.serverBaseUrlBackend;
  private endpoint = environment.customSuppliesEndpointPath;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  async getAll(): Promise<Supply[]> {
    const [rawSupplies, categories, units] = await Promise.all([
      firstValueFrom(this.http.get<any[]>(`${this.baseUrl}${this.endpoint}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError))),
      this.categories.getAllCategories(),
      this.units.getAllUnitMeasurements()
    ]);

    return rawSupplies.map(raw => {
      const category = categories.find(c => c.id === raw.category_id);
      const unit = units.find(u => u.id === raw.unit_measurement_id);
      return Supply.fromPersistence(raw, category, unit);
    });
  }

  async create(payload: CustomSupplyPayload): Promise<any> {
    const res$ = this.http.post(`${this.baseUrl}${this.endpoint}`, payload, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
    return firstValueFrom(res$);
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error('Error in custom supply service'));
  }
}
