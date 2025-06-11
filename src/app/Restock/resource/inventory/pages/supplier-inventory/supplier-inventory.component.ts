import {Component, OnInit} from '@angular/core';
import {Supply} from '../../model/supply.entity';
import {Category} from '../../model/category.entity';
import {UnitMeasurement} from '../../model/unit-measurement.entity';
import {FormFieldSchema} from '../../../../../shared/components/create-and-edit-form/create-and-edit-form.component';
import {SupplyService} from '../../services/supply.service';
import {CategoryService} from '../../services/category.service';
import {UnitMeasurementService} from '../../services/unit-measurement.service';
import {SupplyCarouselComponent} from '../../components/supply-carousel/supply-carousel.component';
import {SupplySectionComponent} from '../../components/supply-section/supply-section.component';
import {InventoryTableComponent} from '../../components/inventory-table/inventory-table.component';
import {DeleteComponent} from '../../../../../shared/components/delete/delete.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BaseModalService} from '../../../../../shared/services/base-modal.service';
import {Batch} from '../../model/batch.entity';
import {BatchService} from '../../services/batch.service';
import {AddBatchToInventoryComponent} from '../../components/add-batch-to-inventory/add-batch-to-inventory.component';
import {CreateAndEditSupplyComponent} from '../../components/create-and-edit-supply/create-and-edit-supply.component';


@Component({
  selector: 'app-supplier-inventory',
  standalone: true,
  templateUrl: './supplier-inventory.component.html',
  imports: [
    SupplyCarouselComponent,
    SupplySectionComponent,
    InventoryTableComponent
  ],
  styleUrls: ['./supplier-inventory.component.css']
})
export class SupplierInventory implements OnInit {
  supplies: Supply[] = [];
  categories: Category[] = [];
  units: UnitMeasurement[] = [];
  batches: Batch[] = [];

  formSchema: FormFieldSchema[] = [];

  constructor(
    private supplyService: SupplyService,
    private categoryService: CategoryService,
    private unitService: UnitMeasurementService,
    private batchService: BatchService,
    private snackBar: MatSnackBar,
    private modalService: BaseModalService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadAll();
    this.buildFormSchema();
    await this.loadSupplies();
    await this.loadBatches();
  }

  buildFormSchema(): void {
    const categoryOptions = this.categories.map(c => ({
      value: c.id,
      label: c.name
    }));

    const unitOptions = this.units.map(u => ({
      value: u.id,
      label: u.name
    }));

    this.formSchema = [
      {name: 'description', label: 'Description', type: 'text', placeholder: 'Enter name'},
      {name: 'perishable', label: 'Perishable', type: 'boolean', placeholder: ''},
      {name: 'min_stock', label: 'Min. Stock', type: 'number', placeholder: 'e.g. 10'},
      {name: 'max_stock', label: 'Max. Stock', type: 'number', placeholder: 'e.g. 100'},
      {name: 'price', label: 'Unit Price (S/.)', type: 'number', placeholder: 'e.g. 4.90', format: 'currency'},
      {
        name: 'category_id',
        label: 'Category',
        type: 'select',
        placeholder: 'Choose category',
        options: categoryOptions
      },
      {
        name: 'unit_measurement_id',
        label: 'Unit',
        type: 'select',
        placeholder: 'Choose unit',
        options: unitOptions
      }
    ];
  }

  buildInventoryFormSchema(selectedSupplyId?: number): FormFieldSchema[] {
    const supplyOptions = this.supplies.map(s => ({
      value: s.id,
      label: s.description
    }));

    const schema: FormFieldSchema[] = [
      {
        name: 'supply_id',
        label: 'Supply',
        type: 'select',
        placeholder: 'Select a supply',
        options: supplyOptions
      },
      {
        name: 'stock',
        label: 'Stock',
        type: 'number',
        placeholder: 'Enter stock'
      }
    ];

    if (selectedSupplyId) {
      const selected = this.supplies.find(s => s.id === selectedSupplyId);
      if (selected?.perishable) {
        schema.push({
          name: 'expiration_date',
          label: 'Expiration Date',
          type: 'date',
          placeholder: 'Select expiration date'
        });
      }
    }

    return schema;
  }

  async loadAll(): Promise<void> {
    this.categories = await this.categoryService.getAllCategories();
    this.units = await this.unitService.getAllUnitMeasurements();
  }

  async loadSupplies(): Promise<void> {
    this.supplies = await this.supplyService.getAllSuppliesEnriched();
  }

  async loadBatches(): Promise<void> {
    this.batches = await this.batchService.getAllBatchesWithSupplies();
  }

  openCreateModal(): void {
    this.modalService.open({
      title: 'Create Supply',
      contentComponent: CreateAndEditSupplyComponent,
      schema: this.formSchema,
      initialData: {},
      mode: 'create'
    }).afterClosed().subscribe(async result => {
      if (result) {
        const newSupply = Supply.fromForm(result, 1); // 1 = user_id temporal
        await this.supplyService.createSupply(newSupply);
        await this.loadSupplies();
      }
    });
  }

  editSupply(supply: Supply): void {
    this.modalService.open({
      title: 'Edit Supply',
      contentComponent: CreateAndEditSupplyComponent,
      schema: this.formSchema,
      initialData: {...supply},
      mode: 'edit'
    }).afterClosed().subscribe(async result => {
      if (result) {
        const updated = Supply.fromForm(result, supply.user_id);
        await this.supplyService.updateSupply(supply.id, updated);
        await this.loadSupplies();
      }
    });
  }

  deleteSupply(supply: Supply): void {
    this.modalService.open({
      title: 'Confirm deletion',
      contentComponent: DeleteComponent,
      width: '25rem',
      initialData: {label: supply.description}
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        await this.supplyService.deleteSupply(supply.id);
        await this.loadSupplies();
      }
    });
  }

  editBatch(batch: Batch): void {
    const initialBatchData = {
      id: batch.id,
      supply_id: batch.supply_id,
      stock: batch.stock,
      expiration_date: batch.expiration_date,
      inventory_id: batch.inventory_id
    };


    this.modalService.open({
      title: 'Edit supply in Inventory',
      contentComponent: AddBatchToInventoryComponent,
      schema: this.buildInventoryFormSchema(batch.supply_id),
      initialData: initialBatchData,
      mode: 'edit',
      injectorValues: {
        supplies: this.supplies
      }
    }).afterClosed().subscribe(async result => {
      if (result) {
        const updated = Batch.fromForm(result, batch.inventory_id);
        await this.batchService.updateBatch(batch.id, updated);
        await this.loadBatches();
      }
    });
  }

  deleteBatch(batch: Batch): void {
    this.modalService.open({
      title: 'Confirm deletion',
      contentComponent: DeleteComponent,
      width: '25rem',
      initialData: { label: batch.supply?.description }
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        await this.batchService.deleteBatch(batch.id);
        await this.loadBatches();
      }
    });
  }


  openAddSupplyToInventory(): void {
    const dialogRef = this.modalService.open({
      title: 'Add to Inventory',
      contentComponent: AddBatchToInventoryComponent,
      schema: this.buildInventoryFormSchema(),
      initialData: {},
      mode: 'create',
      injectorValues: {
        supplies: this.supplies
      }
    });

    const instance = dialogRef.componentInstance.contentComponentRef?.instance as AddBatchToInventoryComponent | undefined;
    instance?.supplyChange.subscribe((supplyId: number) => {
      instance.baseSchema = this.buildInventoryFormSchema(supplyId);
      instance.updateSchema();
    });

    dialogRef.afterOpened().subscribe(() => {
      const instance = dialogRef.componentInstance
        .contentComponentRef?.instance as
        AddBatchToInventoryComponent | undefined;
      instance?.supplyChange.subscribe((supplyId: number) => {
        instance.baseSchema = this.buildInventoryFormSchema(supplyId);
        instance.updateSchema();
      });
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const selectedSupply = this.supplies.find(s => s.id === result.supply_id);

        if (!selectedSupply) {
          this.snackBar.open('Supply not found', 'Close', {duration: 3000});
          return;
        }

        if (selectedSupply.perishable && !result.expiration_date) {
          this.snackBar.open('Expiration date is required for perishable items', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-error'
          });
          return;
        }

        const batch = Batch.fromForm(result, 1); //trabaja con inventory_id pero no lo usa en este caso, esta pendiente de modificar
        await this.batchService.createBatch(batch);

        this.snackBar.open('Batch registered ✅', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });

        await this.loadBatches();
      }
    });
  }
}
