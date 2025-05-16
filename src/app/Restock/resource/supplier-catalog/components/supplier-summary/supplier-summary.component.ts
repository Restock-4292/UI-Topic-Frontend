import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Supplier} from '../../model/supplier.entity';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) { }

  addSupplier(): void {
    this.supplier.added = true;
    // alert(`${this.supplier.name} added to your supplier list!`);
    this.router.navigate(['/dashboard/restaurant/suppliers']);
  }

  contactSupplier(): void {
    const phone = this.supplier.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  }
}
