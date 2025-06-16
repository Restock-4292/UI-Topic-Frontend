// manage-new-orders.component.ts
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Optional,
  Inject, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
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
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {DeleteComponent} from '../../../../../shared/components/delete/delete.component';
import {firstValueFrom} from 'rxjs';
import {BaseModalService} from '../../../../../shared/services/base-modal.service';
import {OrderToSupplier} from '../../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {OrderToSupplierService} from '../../../../resource/orders-to-suppliers/services/order-to-supplier.service';
import {BaseModalComponent} from '../../../../../shared/components/base-modal/base-modal.component';
import {Supply} from '../../../../resource/inventory/model/supply.entity';
import {OrderToSupplierBatch} from '../../../../resource/orders-to-suppliers/model/order-to-supplier-batch.entity';
import {Profile} from '../../../../profiles/model/profile.entity';
import {MatNativeDateModule} from '@angular/material/core';

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
export class ManageNewOrdersComponent implements OnInit {

  // @Input() order: OrderToSupplier | null = null;
  // @Input() adminRestaurantName: string = '';
  //
  // @Input() suppliesDetailsOfOrder: Array<Supply> = [];
  // @Input() batchesOfOrder: Array<OrderToSupplierBatch> = [];

  @Output() openModal = new EventEmitter<OrderToSupplier>();

  openManageNewOrderModal(order: any): void {
    this.openModal.emit(order);
  }

  localOrder: LocalOrder = {
    description: '',
    estimatedShipDate: null,
    estimatedShipTime: null
  };
  dataSource = new MatTableDataSource<any>();
  step = 1;
  selection = new SelectionModel<number>(true, []);

  // Callback para manejar el envío del pedido
  onOrderSubmitted?: (data: any) => void;

  displayedColumns: string[] = ['productName', 'quantity', 'unitMeasure', 'select'];

  // Propiedades para los datos del modal
  order: OrderToSupplier | null = null;
  adminRestaurantName: string = '';
  suppliesDetailsOfOrder: Array<Supply> = [];
  batchesOfOrder: Array<OrderToSupplierBatch> = [];

  constructor(
    private orderService: OrderToSupplierService,
    private snackBar: MatSnackBar,
    @Optional() @Inject('initialData') private injectedData?: any,
    @Optional() private dialogRef?: MatDialogRef<ManageNewOrdersComponent>
  ) {}

  ngOnInit(): void {
    // Si hay datos inyectados del modal, usarlos
    if (this.injectedData) {
      console.log('Datos inyectados:', this.injectedData);

      this.order = this.injectedData.order || null;
      this.adminRestaurantName = this.injectedData.adminRestaurantName || '';
      this.suppliesDetailsOfOrder = this.injectedData.suppliesDetailsOfOrder || [];
      this.batchesOfOrder = this.injectedData.batchesOfOrder || [];
    }

    console.log('Datos finales:', {
      order: this.order,
      supplies: this.suppliesDetailsOfOrder,
      batches: this.batchesOfOrder,
      restaurantName: this.adminRestaurantName
    });


    this.dataSource.data = this.batchesOfOrder;
  }
  // Add this method to get unit measurement
  getUnitMeasurement(supplyId: number): string {
    const supply = this.suppliesDetailsOfOrder.find(s => Number(s.id) === Number(supplyId));
    if (!supply) return 'Unknown unit';

    // Assuming the Supply entity has unit measurement information
    // You may need to adjust this based on your actual Supply entity structure
    return supply.unit_measurement?.name || 'N/A';


  }

  // ngOnInit(): void {
  //   this.resetForm();
  // }

  get isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.batchesOfOrder.length;
    return numSelected === numRows && numRows > 0;
  }

  // get selectedSupplies(): SupplyPerOrder[] {
  //   return this.suppliesPerOrder.filter(supply =>
  //     this.selection.isSelected(supply.supplyId)
  //   );
  // }
  //
  productName(supplyId: number): string {
    const supply = this.suppliesDetailsOfOrder.find(s => Number(s.id) === Number(supplyId));
    return supply ? supply.name : 'Unknown Product';
  }
  //
  // productUnitMeasurement(supplyId: number): string {
  //   const supply = this.detailedSuppliesPerOrder.find(s => Number(s.id) === Number(supplyId));
  //   if (!supply) return 'Unknown unit';
  //
  //   const unitMeasurement = this.unitsMeasurement.find(u => Number(u.id) === Number(supply.unit_measurement_id));
  //   return unitMeasurement ? unitMeasurement.name : 'Unknown unit';
  // }

  masterToggle(): void {
    if (this.isAllSelected) {
      this.selection.clear();
    } else {
      this.batchesOfOrder.forEach(batch =>
        this.selection.select(Number(batch.batch?.supply_id))
      );
    }
  }
  isSelected(supplyId: number): boolean {
    return this.selection.isSelected(supplyId);
  }

  toggleSelection(supplyId: number): void {
    this.selection.toggle(supplyId);
  }

  calculateNewTotalPrice(): number {
    return this.selection.selected.reduce((total, supplyId) => {
      const supplyInOrder = this.batchesOfOrder.find(s => s.batch?.supply_id === supplyId);
      const supplyDetails = this.suppliesDetailsOfOrder.find(s => s.id === supplyId);

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
    this.dialogRef?.close();
  }
  //
  // resetForm(): void {
  //   this.selection.clear();
  //   this.step = 1;
  //   this.localOrder = {
  //     description: '',
  //     estimatedShipDate: null,
  //     estimatedShipTime: null
  //   };
  // }
  //
  // submitOrder(): void {
  //   if (this.selection.selected.length === 0) {
  //     this.snackBar.open('Please select at least one supply', 'Close', {
  //       duration: 3000,
  //       panelClass: ['warning-snackbar']
  //     });
  //     return;
  //   }
  //
  //   const newProductsCount = this.selection.selected.reduce((sum, supplyId) => {
  //     const supplyInOrder = this.suppliesPerOrder.find(s => s.supplyId === supplyId);
  //     return sum + (supplyInOrder ? supplyInOrder.quantity : 0);
  //   }, 0);
  //
  //   const updateData = {
  //     order: this.order,
  //     partiallyAccepted: this.selection.selected.length < this.suppliesPerOrder.length,
  //     newEstimatedShipDate: this.localOrder.estimatedShipDate,
  //     newEstimatedShipTime: this.localOrder.estimatedShipTime,
  //     newTotalPrice: this.calculateNewTotalPrice(),
  //     newDescription: this.localOrder.description,
  //     newRequestedProductsCount: newProductsCount,
  //     selectedSupplies: this.selection.selected,
  //   };
  //
  //   // Ejecutar callback si existe
  //   if (this.onOrderSubmitted) {
  //     this.onOrderSubmitted(updateData);
  //   }
  //
  //   this.snackBar.open('Order submitted successfully!', 'Close', {
  //     duration: 3000,
  //     panelClass: ['success-snackbar']
  //   });
  //
  //   this.closeDialog();
  // }
}
