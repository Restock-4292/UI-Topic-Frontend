import {Component, OnInit} from '@angular/core';
import {InventoryTableComponent} from "../../components/inventory-table/inventory-table.component";
import {SupplyCarouselComponent} from "../../components/supply-carousel/supply-carousel.component";
import {SupplySectionComponent} from "../../components/supply-section/supply-section.component";
import {Supply} from '../../model/supply.entity';
import {SupplyService} from '../../services/supply.service.service';
import {BaseModalService} from '../../../../../shared/services/base-modal.service';
import {mockCategories} from '../../../../../shared/mocks/categories.mock';
import {mockSupplies} from '../../../../../shared/mocks/supplies.mock';
import {mockUser} from '../../../../../shared/mocks/user.mock';
import {mockUnits} from '../../../../../shared/mocks/units-measurements.mock';
import {SupplyFormModal} from '../../components/supply-form-modal/supply-form-modal.component';
import {InventoryAddModal} from '../../components/add-inventory-modal/add-inventory-modal.component';

@Component({
  selector: 'app-restaurant-inventory',
    imports: [
        InventoryTableComponent,
        SupplyCarouselComponent,
        SupplySectionComponent,
        SupplySectionComponent,
        InventoryTableComponent,
        SupplyCarouselComponent
    ],
  templateUrl: './restaurant-inventory.component.html',
  styleUrl: './restaurant-inventory.component.css'
})

export class RestaurantInventoryComponent implements OnInit {
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

      }
    });
  }

}
