import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-supplier-alerts-widget',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderCellDef,
    MatButton,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow
  ],
  templateUrl: './supplier-alerts-widget.component.html',
  styleUrl: './supplier-alerts-widget.component.css'
})
export class SupplierAlertsWidgetComponent {
  alerts = [
    { restaurant: 'El carbonazo', status: 'Request', orderPlaced: '15 minutes ago' },
    { restaurant: 'Cevicheria Beto’s', status: 'Request', orderPlaced: '1 hour ago' },
    { restaurant: 'La Rueda', status: 'Request', orderPlaced: '3 hours ago' }
  ];

  displayedColumns: string[] = ['restaurant', 'status', 'orderPlaced', 'details'];
}
