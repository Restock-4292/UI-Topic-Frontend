import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';

interface SupplierDetail {
  id: number;
  name: string;
  ruc: string;
  category: string;
  status: string;
  registrationDate: string;
  lastUpdate: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  position: string;
}

@Component({
  selector: 'app-supplier-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.css'
})
export class SupplierDetailComponent implements OnInit {
  supplier!: SupplierDetail;
  notFound = false;

  suppliers: SupplierDetail[] = [
    {
      id: 1,
      name: 'Distribuidora Lima',
      ruc: '20512345678',
      category: 'Beverages',
      status: 'Active',
      registrationDate: '2024-05-12',
      lastUpdate: '2025-04-28',
      email: 'lima@supply.com',
      phone: '+51 999 999 999',
      address: 'Av. Arequipa 123, Lima',
      contactPerson: 'Ana Torres',
      position: 'Sales Manager'
    },
    {
      id: 2,
      name: 'Insumos del Norte',
      ruc: '20345678901',
      category: 'Groceries',
      status: 'Active',
      registrationDate: '2023-12-01',
      lastUpdate: '2025-04-28',
      email: 'norte@insumos.com',
      phone: '+51 988 123 456',
      address: 'Jr. Libertad 456, Piura',
      contactPerson: 'Marco Rivera',
      position: 'Administrator'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const match = this.suppliers.find(s => s.id === id);

    if (match) {
      this.supplier = match;
    } else {
      this.notFound = true;
    }
  }

  addSupplier(): void {
    alert(`${this.supplier.name} added to your supplier list!`);
    this.router.navigate(['/dashboard/suppliers']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/suppliers']);
  }
}
