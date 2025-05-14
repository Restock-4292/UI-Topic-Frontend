import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierModalComponent} from '../../components/supplier-modal/supplier-modal.component';
import {NgForOf, NgIf} from '@angular/common';
import {mockSuppliers} from '../../../../shared/mocks/suppliers.mock';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';

interface Supplier {
  id: number;
  name: string;
  category: string;
  email: string;
  added?: boolean;
}

@Component({
  selector: 'app-supplier-overview',
  templateUrl: './supplier-overview.component.html',
  imports: [
    SupplierModalComponent,
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatPaginator,
  ],
  styleUrl: './supplier-overview.component.css'
})
export class SupplierOverviewComponent implements OnInit {
  showAddSupplierModal = false;

  suppliers: Supplier[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showAddSupplierModal = params['addSupplier'] === 'true';
    });
    this.suppliers = mockSuppliers.filter(s => s.added);
  }

  //  Computed property para saber si hay proveedores
  get hasSuppliers(): boolean {
    return this.suppliers.length > 0;
  }

  openAddSupplierModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addSupplier: true },
      queryParamsHandling: 'merge'
    });
  }

  closeModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addSupplier: null },
      queryParamsHandling: 'merge'
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/dashboard/restaurant/suppliers', id]);
  }
}
