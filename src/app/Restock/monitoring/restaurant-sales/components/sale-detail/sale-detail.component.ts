import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaleConfirmationComponent } from '../sale-confirmation/sale-confirmation.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sale-detail',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    SaleConfirmationComponent,
    MatDivider
  ],
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.css'
})
export class SaleDetailComponent {
  @Output() close = new EventEmitter<void>(); // Emits when modal should be closed
  @Input() sale: any;

  // Closes the component (used by close or cancel buttons)
  closeComponent() {
    this.close.emit();
  }

  // Table column definitions
  displayedColumnsPlatos: string[] = ['name', 'price', 'quantity'];
  displayedColumnsInsumos: string[] = ['name', 'price', 'quantity'];

  dishes = new MatTableDataSource<any>([
    { id: 1, name: 'Lomo Saltado', price: 20.5, quantity: 2 },
    { id: 2, name: 'Arroz con Pollo', price: 21.5, quantity: 3 },
    { id: 3, name: 'Arroz con mariscos', price: 34.5, quantity: 1 }
  ]);


  additionalSupplies = new MatTableDataSource<any>([
    { id: 1, name: 'Huevo', price: 1, quantity: 1 },
    { id: 2, name: 'Arroz', price: 0.5, quantity: 2 },
    { id: 3, name: 'Papa', price: 3.5, quantity: 4 }
  ]);




}

