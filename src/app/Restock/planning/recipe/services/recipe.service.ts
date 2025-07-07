import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment.development';
import {Recipe} from '../model/recipe.entity';
import {BaseService} from '../../../../shared/services/base.service';
import {catchError, map, Observable, retry, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.serverBaseUrlBackend;
  private readonly endpoint = environment.recipesEndpointPath;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getAll(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${this.baseUrl}${this.endpoint}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}${this.endpoint}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  create(recipe: any): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}${this.endpoint}`, recipe, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(id: number, recipe: any): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}${this.endpoint}/${id}`, recipe, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(() => new Error('Error in recipe service'));
  }
}
