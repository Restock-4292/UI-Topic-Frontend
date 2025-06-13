// order-details-modal.component.ts
import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgForOf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderToSupplier } from '../../model/order-to-supplier.entity';

@Component({
  selector: 'order-details-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, NgForOf],
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.css']
})
export class OrderDetailsModalComponent {
  @Input() order!: OrderToSupplier;

  @ViewChild('orderDetailsTemplate') orderDetailsRef!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  open(): void {
    this.dialog.open(this.orderDetailsRef, {
      width: '600px',
    });
  }

  close(): void {
    this.dialog.closeAll();
  }
}
