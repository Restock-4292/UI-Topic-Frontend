// manage-new-orders.component.ts
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';
import { MatList, MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialogActions, MatDialogContent} from '@angular/material/dialog';

export interface Supply {
  id: number;
  name: string;
  price: number;
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

export interface Order {
  id?: number;
  totalPrice: number;
  estimatedShipDate?: string;
  estimatedShipTime?: string;
  description?: string;
  adminRestaurantId?: number;
}

interface LocalOrder {
  description: string;
  estimatedShipDate: Date | null;
  estimatedShipTime: string | null;
}

@Component({
  selector: 'app-manage-new-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatStepperModule,
    FormsModule,
    MatListModule,
    MatIcon,
    MatPaginator,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './manage-new-orders.component.html',
  styleUrl: './manage-new-orders.component.css'
})
export class ManageNewOrdersComponent implements OnInit, OnChanges {
  @Input() modelValue: boolean = false;
  @Input() hideState: boolean = false;

  @Output() modelValueChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();
  @Output() orderSubmitted = new EventEmitter<any>();

  step = 1;
  selection = new SelectionModel<number>(true, []);
  localOrder: LocalOrder = {
    description: '',
    estimatedShipDate: null,
    estimatedShipTime: null
  };

  // Datos estáticos - esto es lo que querías
  suppliesPerOrder: SupplyPerOrder[] = [
    { supplyId: 1, quantity: 10 },
    { supplyId: 2, quantity: 5 },
    { supplyId: 3, quantity: 20 },
    { supplyId: 4, quantity: 15 },
    { supplyId: 5, quantity: 8 }
  ];

  detailedSuppliesPerOrder: Supply[] = [
    { id: 1, name: 'Office Paper A4', price: 15.99, unit_measurement_id: 1 },
    { id: 2, name: 'Blue Ink Pens', price: 8.50, unit_measurement_id: 2 },
    { id: 3, name: 'Printer Cartridge', price: 45.00, unit_measurement_id: 3 },
    { id: 4, name: 'Desk Organizer', price: 25.75, unit_measurement_id: 3 },
    { id: 5, name: 'Sticky Notes Pack', price: 12.30, unit_measurement_id: 2 }
  ];

  order: Order = {
    totalPrice: 1247.85,
    description: 'Monthly office supplies order'
  };

  unitsMeasurement: UnitMeasurement[] = [
    { id: 1, name: 'Packs' },
    { id: 2, name: 'Units' },
    { id: 3, name: 'Pieces' }
  ];

  displayedColumns: string[] = ['select', 'productName', 'quantity', 'unitMeasure'];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelValue'] && changes['modelValue'].currentValue) {
      this.resetForm();
    }
  }

  get isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.suppliesPerOrder.length;
    return numSelected === numRows && numRows > 0;
  }

  get selectedSupplies(): SupplyPerOrder[] {
    return this.suppliesPerOrder.filter(supply =>
      this.selection.isSelected(supply.supplyId)
    );
  }

  productName(supplyId: number): string {
    const supply = this.detailedSuppliesPerOrder.find(s => Number(s.id) === Number(supplyId));
    return supply ? supply.name : 'Unknown Product';
  }

  productUnitMeasurement(supplyId: number): string {
    const supply = this.detailedSuppliesPerOrder.find(s => Number(s.id) === Number(supplyId));
    if (!supply) return 'Unknown unit';

    const unitMeasurement = this.unitsMeasurement.find(u => Number(u.id) === Number(supply.unit_measurement_id));
    return unitMeasurement ? unitMeasurement.name : 'Unknown unit';
  }

  masterToggle(): void {
    if (this.isAllSelected) {
      this.selection.clear();
    } else {
      this.suppliesPerOrder.forEach(supply =>
        this.selection.select(supply.supplyId)
      );
    }
  }

  calculateNewTotalPrice(): number {
    return this.selection.selected.reduce((total, supplyId) => {
      const supplyInOrder = this.suppliesPerOrder.find(s => s.supplyId === supplyId);
      const supplyDetails = this.detailedSuppliesPerOrder.find(s => s.id === supplyId);

      if (supplyInOrder && supplyDetails) {
        return total + (supplyDetails.price * supplyInOrder.quantity);
      }
      return total;
    }, 0);
  }

  nextStep(): void {
    if (this.step < 2) {
      this.step++;
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  closeDialog(): void {
    this.modelValueChange.emit(false);
    this.close.emit(false);
  }

  resetForm(): void {
    this.selection.clear();
    this.step = 1;
    this.localOrder = {
      description: '',
      estimatedShipDate: null,
      estimatedShipTime: null
    };
  }

  submitOrder(): void {
    if (this.selection.selected.length === 0) {
      this.snackBar.open('Please select at least one supply', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }

    const newProductsCount = this.selection.selected.reduce((sum, supplyId) => {
      const supplyInOrder = this.suppliesPerOrder.find(s => s.supplyId === supplyId);
      return sum + (supplyInOrder ? supplyInOrder.quantity : 0);
    }, 0);

    const updateData = {
      order: this.order,
      partiallyAccepted: this.selection.selected.length < this.suppliesPerOrder.length,
      newEstimatedShipDate: this.localOrder.estimatedShipDate,
      newEstimatedShipTime: this.localOrder.estimatedShipTime,
      newTotalPrice: this.calculateNewTotalPrice(),
      newDescription: this.localOrder.description,
      newRequestedProductsCount: newProductsCount,
      selectedSupplies: this.selection.selected,
    };

    this.orderSubmitted.emit(updateData);

    this.snackBar.open('Order submitted successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });

    this.closeDialog();
  }
}
