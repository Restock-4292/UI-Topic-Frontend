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
    SupplyCarouselComponent
  ],
  styleUrls: ['./supplier-inventory.component.css']
})
export class SupplierInventory implements OnInit {
  supplies: Supply[] = [];
  categories = mockCategories;

  constructor(
    private supplyService: SupplyService,
    private modalService: BaseModalService
  ) {}



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
        form: {}, // campos vacíos
        isEdit: false
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.supplyService.create(result).subscribe(() => this.fetchSupplies());
      }
    });
  }

  editSupply(supply: Supply): void {
    this.modalService.open(SupplyFormModal, {
      data: {
        form: { ...supply },
        isEdit: true
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.supplyService.update(supply.id, result).subscribe(() => this.fetchSupplies());
      }
    });
  }

  deleteSupply(supply: Supply): void {
    const confirmed = confirm(`Delete "${supply.description}"?`);
    if (confirmed) {
      this.supplyService.delete(supply.id).subscribe(() => this.fetchSupplies());
    }
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
