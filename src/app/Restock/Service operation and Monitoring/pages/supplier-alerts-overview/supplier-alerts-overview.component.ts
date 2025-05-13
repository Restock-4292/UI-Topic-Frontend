import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-supplier-alerts-overview',
  imports: [
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './supplier-alerts-overview.component.html',
  styleUrl: './supplier-alerts-overview.component.css'
})
export class SupplierAlertsOverviewComponent {

  filter = 'All';

  alerts = [
    { restaurant: 'El carbonazo', status: 'Ordering request', orderPlaced: '15 minutes ago' },
    { restaurant: 'Cevicheria Beto’s', status: 'Ordering request', orderPlaced: '1 hour ago' },
    { restaurant: 'La Rueda', status: 'Ordering request', orderPlaced: '3 hours ago' },
    { restaurant: 'Rustica', status: 'Ordering request', orderPlaced: '1 day ago' },
    { restaurant: 'Arroz y Desgracias', status: 'Ordering request', orderPlaced: '1 day ago' },
  ];

  displayedColumns: string[] = ['restaurant', 'details', 'status', 'orderPlaced'];
}
