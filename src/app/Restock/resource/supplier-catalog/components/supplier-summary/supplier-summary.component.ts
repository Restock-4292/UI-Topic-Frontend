import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Supplier} from '../../model/supplier.entity';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-supplier-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './supplier-summary.component.html',
  styleUrl: './supplier-summary.component.css'
})
export class SupplierSummaryComponent {
  @Input() supplier!: Supplier;
  readonly RESTAURANT_ID = 2;
  readonly API_URL = environment.serverBaseUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  addSupplier(): void {
    const url = `${this.API_URL}/restaurant_suppliers?restaurant_id=${this.RESTAURANT_ID}&supplier_id=${this.supplier.id}`;
    this.http.get<any[]>(url).subscribe({
      next: existing => {
        if (existing.length > 0) {
          console.log('Supplier already added.');
          return;
        }
        this.http.post(`${this.API_URL}/restaurant_suppliers`, {
          restaurant_id: this.RESTAURANT_ID,
          supplier_id: this.supplier.id
        }).subscribe({
          next: () => this.router.navigate(['/dashboard/restaurant/suppliers']),
          error: err => console.error('Error adding supplier:', err)
        });
      },
      error: err => console.error('Error checking supplier:', err)
    });
  }

  contactSupplier(): void {
    const phone = this.supplier.phone?.replace(/\D/g, '');
    if (phone) {
      window.open(`https://wa.me/${phone}`, '_blank');
    }
  }
}
