import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatIconButton} from '@angular/material/button';

interface Supplier {
  id: number;
  name: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-supplier-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './supplier-modal.component.html',
  styleUrl: './supplier-modal.component.css'
})


export class SupplierModalComponent {
  displayedColumns: string[] = ['name', 'email', 'address', 'catalog'];

  suppliers: Supplier[] = [
    { id: 1, name: 'Distribuidora Lima', email: 'lima@supply.com', address: 'Av. Arequipa 123' },
    { id: 2, name: 'Insumos del Norte', email: 'norte@insumos.com', address: 'Jr. Libertad 456' },
    { id: 3, name: 'Abarrotes S.A.C.', email: 'ventas@abarrotes.com', address: 'Calle Real 789' }
  ];

  constructor(private router: Router) {}

  goToDetail(supplierId: number): void {
    this.router.navigate(['/dashboard/suppliers', supplierId]);
  }
}
