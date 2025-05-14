import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierModalComponent} from '../../components/supplier-modal/supplier-modal.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-supplier-overview',
  standalone: true,
  imports: [
    CommonModule,
    SupplierModalComponent
  ],
  templateUrl: './supplier-overview.component.html',
  styleUrl: './supplier-overview.component.css'
})
export class SupplierOverviewComponent implements OnInit {
  showAddSupplierModal = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showAddSupplierModal = params['addSupplier'] === 'true';
    });
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

  viewCatalog(supplier: any): void {
    this.router.navigate(['/dashboard/suppliers', supplier.id]);
  }
}
