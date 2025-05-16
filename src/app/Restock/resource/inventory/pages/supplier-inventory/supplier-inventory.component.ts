import { Component, OnInit } from '@angular/core';
import { Supply } from '../../model/supply.entity';
import {SupplyService} from '../../services/supply.service.service';
import {mockUser} from '../../../../../shared/mocks/user.mock';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {SupplySectionComponent} from '../../components/supply-section/supply-section.component';
import {InventoryTableComponent} from '../../components/inventory-table/inventory-table.component';
import {SupplyFormModal} from '../../components/supply-form-modal/supply-form-modal.component';
import {BaseModalService} from '../../../../../shared/services/base-modal.service';
import {SupplyCarouselComponent} from '../../components/supply-carousel/supply-carousel.component';
import {mockSupplies} from '../../../../../shared/mocks/supplies.mock';
import {mockCategories} from '../../../../../shared/mocks/categories.mock';
import {mockUnits} from '../../../../../shared/mocks/units-measurements.mock';
import {InventoryAddModal} from '../../components/add-inventory-modal/add-inventory-modal.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {EditSupplyModalComponent} from '../../components/edit-supply-modal/edit-supply-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmDeleteModalComponent} from '../../components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-supplier-inventory',
  standalone: true,
  templateUrl: './supplier-inventory.component.html',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTableModule,
    FormsModule,
    SupplySectionComponent,
    InventoryTableComponent,
    SupplyCarouselComponent,
    MatSnackBarModule,
    MatDialogModule
  ],
  styleUrls: ['./supplier-inventory.component.css']
})
export class SupplierInventory implements OnInit {
  supplies: Supply[] = [];
  categories = mockCategories;

  constructor(
    private supplyService: SupplyService,
    private modalService: BaseModalService,
  private snackBar: MatSnackBar,
    private dialog: MatDialogModule
) {}

  private generateFakeId(): number {
    const ids = this.supplies.map(s => s.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }


  ngOnInit(): void {
    this.fetchSupplies();
  }

  fetchSupplies(): void {
    this.supplies = mockSupplies
      .filter(s => s.user_id === mockUser.id)
      .map(supply => {
        const category = mockCategories.find(c => c.id === supply.category_id);
        const unit = mockUnits.find(u => u.id === supply.unit_measurement_id);
        return {
          ...supply,
          category,
          unit_measurement: unit
        };
      });
  }


  openCreateModal(): void {
    this.modalService.open(SupplyFormModal, {
      data: {
        form: {},
        isEdit: false
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        // Simula creación "temporal"
        const newSupply = {
          ...result,
          id: Math.floor(Math.random() * 10000), // ID temporal
          user_id: mockUser.id,
          category: mockCategories.find(c => c.id === result.category_id),
          unit_measurement: mockUnits.find(u => u.id === result.unit_measurement_id)
        };
        this.supplies.push(newSupply); // Inserta en la tabla
        this.snackBar.open('Supply created successfully ✅', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      }
    });
  }


  editSupply(supply: Supply): void {
    this.modalService.open(EditSupplyModalComponent, {
      data: { supply },
      width: '480px'
    }).afterClosed().subscribe((result: Partial<Supply> | undefined) => {
      if (result) {
        const index = this.supplies.findIndex(s => s.id === supply.id);
        if (index !== -1) {
          this.supplies[index] = {
            ...this.supplies[index],
            ...result
          };
        }

        this.snackBar.open('Supply updated ✅', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      }
    });
  }

  deleteSupply(supply: Supply): void {
    this.modalService.open(ConfirmDeleteModalComponent, {
      data: { name: supply.description },
      width: '400px'
    }).afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.supplies = this.supplies.filter(s => s.id !== supply.id);

        this.snackBar.open('Supply deleted 🗑️', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      }
    });
  }
  openAddSupplyToInventory(): void {
    this.modalService.open(InventoryAddModal, {
      data: {
        supplies: this.supplies
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo lote:', result);
        // Aquí puedes actualizar tabla, mock, etc.
      }
    });
  }

}
