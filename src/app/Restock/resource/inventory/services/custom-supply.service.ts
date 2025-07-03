import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, retry, throwError } from 'rxjs';
import { CategoryService } from './category.service';
import { Supply } from '../model/supply.entity';
import {environment} from '../../../../../environments/environment.development';
import {CatalogSupplyService} from './catalog-supply.service';
import {CustomSupplyAssembler} from './custom-supply.assembler';

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
  private catalog = inject(CatalogSupplyService);
  private baseUrl = environment.serverBaseUrlBackend;
  private endpoint = environment.customSuppliesEndpointPath;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  async getAll(): Promise<Supply[]> {
    const [customs, catalogSupplies, categories] = await Promise.all([
      firstValueFrom(
        this.http.get<any[]>(`${this.baseUrl}${this.endpoint}`, this.httpOptions)
          .pipe(retry(2), catchError(this.handleError))
      ),
      this.catalog.getCatalogSupplies(),
      this.categories.getAllCategories()
    ]);

    return customs.map(custom => {
      const catalog = catalogSupplies.find(c => c.id === custom.supplyId
      );
      const category = categories.find(c => c.id === (catalog?.category_id ?? catalog?.categoryId));
      return CustomSupplyAssembler.toEntity(custom, catalog, category);
    });
  }

  async create(payload: CustomSupplyPayload | Supply): Promise<any> {
    const dto = (payload instanceof Supply)
      ? CustomSupplyAssembler.toDTO(payload)
      : payload;

    const res$ = this.http.post(`${this.baseUrl}${this.endpoint}`, dto, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
    return firstValueFrom(res$);
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error('Error in custom supply service'));
  }
}
