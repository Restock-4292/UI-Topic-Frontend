import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RestaurantContactService} from '../../services/restaurant-contact.service';

@Component({
  selector: 'app-supplier-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './supplier-summary.component.html',
  styleUrl: './supplier-summary.component.css'
})
export class SupplierSummaryComponent {
  @Input() supplier: any;
  readonly restaurantId = 2; // reemplazar con valor dinámico más adelante si es necesario

  constructor(
    private router: Router,
    private contactService: RestaurantContactService
  ) {}

  addSupplier(): void {
    this.contactService.checkIfExists(this.restaurantId, this.supplier.id).subscribe({
      next: (exists) => {
        if (exists) {
          console.log('Supplier already added.');
          return;
        }
        this.contactService.addContact(this.restaurantId, this.supplier.id).subscribe({
          next: () => this.router.navigate(['/dashboard/restaurant/suppliers'], { queryParams: { added: true } }),
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
