import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierSummaryComponent } from '../../components/supplier-summary/supplier-summary.component';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { SupplierAssembler } from '../../services/supplier.assembler';

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SupplierSummaryComponent],
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.css'
})
export class SupplierDetailComponent implements OnInit {
  supplier: any = null;
  notFound = false;

  private readonly API = environment.serverBaseUrl;
  private readonly USERS_PATH = environment.suppliersEndpointPath;
  private readonly ROLES_PATH = environment.rolesEndpointPath;
  private readonly PROFILES_PATH = environment.profilesEndpointPath;
  private readonly CATEGORIES_PATH = environment.businessCategoriesEndpointPath;
  private readonly PROFILE_CATEGORIES_PATH = environment.profilesBusinessCategoriesEndpointPath;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private assembler: SupplierAssembler
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin([
      this.http.get<any>(`${this.API}${this.USERS_PATH}/${id}`),
      this.http.get<any[]>(`${this.API}${this.ROLES_PATH}`),
      this.http.get<any[]>(`${this.API}${this.PROFILES_PATH}`),
      this.http.get<any[]>(`${this.API}${this.PROFILE_CATEGORIES_PATH}`),
      this.http.get<any[]>(`${this.API}${this.CATEGORIES_PATH}`)
    ]).subscribe({
      next: ([user, roles, profiles, profileCategories, categories]) => {
        const supplierRole = roles.find(r => r.name === 'supplier');
        if (!supplierRole || +user.role_id !== +supplierRole.id) {
          this.notFound = true;
          return;
        }

        const profile = profiles.find(p => p.user_id === user.id);
        const categoryIds = profileCategories
          .filter(link => link.profile_id === profile?.id)
          .map(link => link.business_category_id);
        const supplierCategories = categories.filter(cat => categoryIds.includes(cat.id));

        this.supplier = this.assembler.toSupplierObject({
          user,
          profile,
          role: supplierRole,
          categories: supplierCategories
        });
      },
      error: () => {
        this.notFound = true;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/restaurant/suppliers']);
  }
}
