import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-supplier-account-widget',
  imports: [
    MatIcon,
    NgIf
  ],
  templateUrl: './supplier-account-widget.component.html',
  styleUrl: './supplier-account-widget.component.css'
})
export class SupplierAccountWidgetComponent {
  weeklyEarnings = 1875.50;
  purchasedSupplies = 42;
  isMobile = false;

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 800;
  }
}
