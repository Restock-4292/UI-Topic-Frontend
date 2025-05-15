import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-supplier-account-widget',
  imports: [
    MatIcon
  ],
  templateUrl: './supplier-account-widget.component.html',
  styleUrl: './supplier-account-widget.component.css'
})
export class SupplierAccountWidgetComponent {
  weeklyEarnings = 1875.50;
  purchasedSupplies = 42;
}
