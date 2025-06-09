import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'orders-toolbar',
  templateUrl: './orders-toolbar.component.html',
  styleUrls: ['./orders-toolbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
})
export class OrdersToolbarComponent {
  @Output() createOrder = new EventEmitter<void>();

  searchControl = new FormControl('');
  selectedSupply: number | null = null;
  selectedSupplierFilter: number | null = null;

  supplies = [
    { id: 1, name: 'Arroz' },
    { id: 2, name: 'Papa' }
  ];

  suppliers = [
    { id: 1, name: 'Proveedor A' },
    { id: 2, name: 'Proveedor B' }
  ];

  onCreateOrder(): void {
    this.createOrder.emit();
  }

  onFilterChange(): void {
    // Lógica opcional si necesitas emitir eventos al cambiar filtros
  }
}
