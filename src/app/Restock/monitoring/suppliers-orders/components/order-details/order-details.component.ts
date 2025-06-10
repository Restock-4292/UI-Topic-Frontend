// order-details.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

export interface Supply {
  id: number;
  name: string;
  unit_measurement_id: number;
}

export interface SupplyPerOrder {
  supplyId: number;
  quantity: number;
}

export interface UnitMeasurement {
  id: number;
  name: string;
}

export interface OrderState {
  id: number;
  name: string;
}

export interface OrderSituation {
  id: number;
  name: string;
}

export interface AdminRestaurantProfile {
  userId: number;
  businessName: string;
}

export interface Order {
  id: number;
  totalPrice: number;
  estimatedShipDate: string;
  estimatedShipTime: string;
  description: string;
  adminRestaurantId: number;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatStepperModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnChanges {
  @Input() hideState: boolean = false;
  @Input() modelValue: boolean = true;
  @Input() suppliesPerOrder: SupplyPerOrder[] = [];
  @Input() detailedSuppliesPerOrder: Supply[] = [];
  @Input() order: Order | null = null;
  @Input() orderState: OrderState | null = null;
  @Input() orderSituation: OrderSituation | null = null;
  @Input() unitsMeasurement: UnitMeasurement[] = [];
  @Input() adminRestaurantsProfiles: AdminRestaurantProfile[] = [];

  @Output() modelValueChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();

  step: number = 1;
  steps: string[] = ["On hold", "Preparing", "On the way", "Delivered"];
  statusToStepIndex: { [key: number]: number } = {
    1: 0,  // -> "On hold"
    2: 1,  // -> "Preparing"
    3: 2,  // -> "On the way"
    4: 3,  // -> "Delivered"
  };

  displayedColumns: string[] = ['productName', 'quantity', 'unitMeasure'];

  // Datos constantes de ejemplo
  constantData = {
    suppliesPerOrder: [
      { supplyId: 1, quantity: 50 },
      { supplyId: 2, quantity: 25 },
      { supplyId: 3, quantity: 100 },
      { supplyId: 4, quantity: 30 }
    ],
    detailedSuppliesPerOrder: [
      { id: 1, name: 'Tomatoes', unit_measurement_id: 1 },
      { id: 2, name: 'Chicken Breast', unit_measurement_id: 1 },
      { id: 3, name: 'Rice', unit_measurement_id: 1 },
      { id: 4, name: 'Olive Oil', unit_measurement_id: 2 }
    ],
    unitsMeasurement: [
      { id: 1, name: 'kg' },
      { id: 2, name: 'liters' },
      { id: 3, name: 'units' }
    ],
    order: {
      id: 1,
      totalPrice: 450.75,
      estimatedShipDate: '2025-06-15',
      estimatedShipTime: '2025-06-15T14:30:00',
      description: 'Weekly supply order for restaurant operations including fresh vegetables, proteins, and essential cooking ingredients.',
      adminRestaurantId: 1
    },
    orderState: {
      id: 2,
      name: 'Preparing'
    },
    orderSituation: {
      id: 1,
      name: 'Active'
    },
    adminRestaurantsProfiles: [
      { userId: 1, businessName: 'La Bella Vista Restaurant' },
      { userId: 2, businessName: 'El Buen Sabor' }
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelValue'] && changes['modelValue'].currentValue) {
      this.step = 1;
    }
  }

  get computedCurrentIndex(): number {
    const currentOrderState = this.orderState || this.constantData.orderState;
    return currentOrderState?.id !== undefined
      ? this.statusToStepIndex[currentOrderState.id] ?? 0
      : 1;
  }

  get currentSuppliesPerOrder(): SupplyPerOrder[] {
    return this.suppliesPerOrder.length > 0 ? this.suppliesPerOrder : this.constantData.suppliesPerOrder;
  }

  get currentDetailedSupplies(): Supply[] {
    return this.detailedSuppliesPerOrder.length > 0 ? this.detailedSuppliesPerOrder : this.constantData.detailedSuppliesPerOrder;
  }

  get currentOrder(): Order {
    return this.order || this.constantData.order;
  }

  get currentOrderSituation(): OrderSituation {
    return this.orderSituation || this.constantData.orderSituation;
  }

  get currentUnitsOfMeasurement(): UnitMeasurement[] {
    return this.unitsMeasurement.length > 0 ? this.unitsMeasurement : this.constantData.unitsMeasurement;
  }

  get currentAdminProfiles(): AdminRestaurantProfile[] {
    return this.adminRestaurantsProfiles.length > 0 ? this.adminRestaurantsProfiles : this.constantData.adminRestaurantsProfiles;
  }

  nextStep(): void {
    if (this.step < 2) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  productName(supplyId: number): string {
    const supply = this.currentDetailedSupplies.find(s => Number(s.id) === Number(supplyId));
    return supply ? supply.name : 'Unknown Product';
  }

  productUnitMeasurement(supplyId: number): string {
    const supply = this.currentDetailedSupplies.find(s => Number(s.id) === Number(supplyId));
    if (!supply) return 'Unknown unit';

    const unitMeasurement = this.currentUnitsOfMeasurement.find(u => Number(u.id) === Number(supply.unit_measurement_id));
    return unitMeasurement ? unitMeasurement.name : 'Unknown unit';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'Not set';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  }

  formatTime(dateStr: string): string {
    if (!dateStr) return 'Not set';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  restaurantBusinessName(order: Order): string {
    const profile = this.currentAdminProfiles.find(p => p.userId === order.adminRestaurantId);
    return profile ? profile.businessName : 'Unknown Restaurant';
  }

  onClose(): void {
    this.modelValueChange.emit(false);
    this.close.emit(false);
  }

  getStepClass(index: number): string {
    const currentIndex = this.computedCurrentIndex;
    if (currentIndex > index) return 'completed';
    if (currentIndex === index) return 'active';
    return 'pending';
  }

  getProgressWidth(): string {
    return `${(this.computedCurrentIndex / (this.steps.length - 1)) * 100}%`;
  }
}
