import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SupplierModalComponent} from '../../components/supplier-modal/supplier-modal.component';
import {NgForOf, NgIf} from '@angular/common';

interface Supplier {
  id: number;
  name: string;
  category: string;
  email: string;
}

@Component({
  selector: 'app-supplier-overview',
  templateUrl: './supplier-overview.component.html',
  imports: [
    SupplierModalComponent,
    NgForOf,
    NgIf
  ],
  styleUrl: './supplier-overview.component.css'
})
export class SupplierOverviewComponent implements OnInit {
  showAddSupplierModal = false;

  suppliers: Supplier[] = [
    { id: 1, name: 'Distribuidora Lima', category: 'Beverages', email: 'lima@supply.com' },
    { id: 2, name: 'Insumos del Norte', category: 'Groceries', email: 'norte@insumos.com' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showAddSupplierModal = params['addSupplier'] === 'true';
    });
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

  viewCatalog(supplier: Supplier): void {
    this.router.navigate(['/dashboard/suppliers', supplier.id]);
  }
}
