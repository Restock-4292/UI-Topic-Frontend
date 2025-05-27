import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SupplierSummaryComponent} from '../../components/supplier-summary/supplier-summary.component';
import {Supplier} from '../../model/supplier.entity';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SupplierSummaryComponent
  ],
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.css'
})
export class SupplierDetailComponent implements OnInit {
  supplier!: Supplier;
  notFound = false;
  readonly API_URL = environment.serverBaseUrl;
  readonly RESTAURANT_ID = 2;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(`${this.API_URL}/users/${id}`).subscribe({
      next: (data) => {
        console.log('Fetched user:', data); // debug
        if (!data || !data.role_id || data.role_id.name !== 'supplier') {
          this.notFound = true;
          return;
        }
        this.supplier = {
          id: data.id,
          name: data.name,
          email: data.email,
          address: data.address || '-',
          phone: data.phone || '',
          ruc: data.ruc || '',
          contactPerson: data.contactPerson || '',
          position: data.position || '',
          category: data.category || '',
          status: data.status ?? true,
          registrationDate: data.registrationDate || '',
          lastUpdate: data.lastUpdate || '',
          added: false
        };
      },
      error: (err) => {
        console.error('Fetch error:', err);
        this.notFound = true;
      }
    })
  }

  goBack():
    void {
    this.router.navigate(['/dashboard/restaurant/suppliers']);
  }
}
