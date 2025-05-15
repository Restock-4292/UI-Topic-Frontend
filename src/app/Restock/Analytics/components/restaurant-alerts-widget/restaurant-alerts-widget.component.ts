import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-restaurant-alerts-widget',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatButton,
    MatRow,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    NgClass
  ],
  templateUrl: './restaurant-alerts-widget.component.html',
  styleUrl: './restaurant-alerts-widget.component.css'
})
export class RestaurantAlertsWidgetComponent {
  displayedColumns: string[] = ['ingredient', 'status'];

  alerts = [
    { ingredient: 'Aji amarillo', status: 'Low stock' },
    { ingredient: 'Cebolla roja', status: 'Max stock' },
    { ingredient: 'Lechuga', status: 'Low stock' },
    { ingredient: 'Culantro', status: 'Max stock' }
  ];
}
