import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { mockSuppliers } from '../../../../shared/mocks/suppliers.mock';
import { Supplier } from '../../model/supplier.entity'; // Usa tu entidad

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.css'
})
export class SupplierDetailComponent implements OnInit {
  supplier!: Supplier;
  notFound = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const match = mockSuppliers.find(s => s.id === id); // ✅ Busca en el mock

    if (match) {
      this.supplier = match;
    } else {
      this.notFound = true;
    }
  }

  addSupplier(): void {
    this.supplier.added = true;
    alert(`${this.supplier.name} added to your supplier list!`);
    this.router.navigate(['/dashboard/restaurant/suppliers']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/restaurant/suppliers']);
  }
}
