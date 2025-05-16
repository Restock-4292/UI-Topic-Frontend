import {Component, Inject, inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Supply } from '../../model/supply.entity';
import {mockSupplies} from '../../../../../shared/mocks/supplies.mock';

@Component({
  selector: 'app-inventory-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './add-inventory-modal.component.html',
  styleUrls: ['./add-inventory-modal.component.css']
})
export class InventoryAddModal {
  supplies: Supply[] = [];
  form = {
    supply_id: null,
    stock: null
  };

  constructor(
    private dialogRef: MatDialogRef<InventoryAddModal>,
    @Inject(MAT_DIALOG_DATA) public data: { supplies: Supply[] }
  ) {
    this.supplies = data.supplies;
  }

  selectedSupplyId?: number;
  selectedStock?: number;

  stockOptions = [1, 5, 10, 20, 30, 50, 100];

  add(): void {
    if (!this.selectedSupplyId || !this.selectedStock) {
      alert('Please select both a supply and a stock value.');
      return;
    }

    this.dialogRef.close({
      supply_id: this.selectedSupplyId,
      stock: this.selectedStock
    });
  }

  submit(): void {
    if (this.form.supply_id && this.form.stock) {
      this.dialogRef.close(this.form);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
