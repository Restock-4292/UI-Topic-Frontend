import {Component} from '@angular/core';
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
import {NgIf} from '@angular/common';

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
    MatRow,
    NgIf
  ],
  templateUrl: './supplier-alerts-widget.component.html',
  styleUrl: './supplier-alerts-widget.component.css'
})
export class SupplierAlertsWidgetComponent {
  alerts = [
    {restaurant: 'El carbonazo', status: 'Request', orderPlaced: '15 minutes ago', details: ''},
    {restaurant: 'Cevicheria Beto’s', status: 'Request', orderPlaced: '1 hour ago'},
    {restaurant: 'La Rueda', status: 'Request', orderPlaced: '3 hours ago'}
  ];

  displayedColumns: string[] = ['restaurant', 'status', 'orderPlaced', 'details'];
  mobileColumns: string[] = ['restaurant', 'status'];
  isMobile = false;

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }
  checkViewport(): void {
    this.isMobile = window.innerWidth <= 800;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  getColumns(): string[] {
    return this.isMobile ? this.mobileColumns : this.displayedColumns;
  }
}
