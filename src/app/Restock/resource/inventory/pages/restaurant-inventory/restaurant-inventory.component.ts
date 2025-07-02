import {Component, OnInit} from '@angular/core';
import {Supply} from '../../model/supply.entity';
import {Category} from '../../model/category.entity';
import {FormFieldSchema} from '../../../../../shared/components/create-and-edit-form/create-and-edit-form.component';
import {SupplyService} from '../../services/supply.service';
import {CategoryService} from '../../services/category.service';
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
import {TranslateService} from '@ngx-translate/core';
import {CustomSupplyService} from '../../services/custom-supply.service';
import {CreateCustomSupplyComponent} from '../../components/create-custom-supply/create-custom-supply.component';

@Component({
  selector: 'app-restaurant-inventory',
  standalone: true,
  templateUrl: './restaurant-inventory.component.html',
  imports: [
    SupplyCarouselComponent,
    SupplySectionComponent,
    InventoryTableComponent
  ],
  styleUrls: ['./restaurant-inventory.component.css']
})
export class RestaurantInventoryComponent implements OnInit {
  supplies: Supply[] = [];
  categories: Category[] = [];
  batches: Batch[] = [];

  formSchema: FormFieldSchema[] = [];

  constructor(
    private supplyService: SupplyService,
    private categoryService: CategoryService,
    private batchService: BatchService,
    private snackBar: MatSnackBar,
    private modalService: BaseModalService,
    private translate: TranslateService,
    private customSupplyService: CustomSupplyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadCategories();
    this.buildFormSchema();
    await this.loadSupplies();
    await this.loadBatches();
    console.log(this.supplies)
  }

  buildFormSchema(): void {
    const categoryOptions = this.categories.map(c => ({
      value: c.id,
      label: c.name
    }));

    this.formSchema = [
      {
        name: 'name',
        label: this.translate.instant('inventory.name'),
        type: 'text',
        placeholder: this.translate.instant('inventory.name'),
        step: 1
      },
      {
        name: 'description',
        label: this.translate.instant('inventory.descriptionOptional'),
        type: 'text',
        placeholder: this.translate.instant('inventory.descriptionOptional'),
        step: 1
      },
      {
        name: 'perishable',
        label: this.translate.instant('inventory.perishable'),
        type: 'boolean',
        placeholder: '',
        step: 1
      },
      { name: 'min_stock', label: 'Min. Stock', type: 'number', placeholder: 'e.g. 10', step: 2 },
      { name: 'max_stock', label: 'Max. Stock', type: 'number', placeholder: 'e.g. 100', step: 2 },
      { name: 'price', label: this.translate.instant('inventory.unitPrice'), type: 'number', placeholder: 'e.g. 4.90', format: 'currency', step: 2 },
      {
        name: 'category_id',
        label: this.translate.instant('inventory.category'),
        type: 'select',
        placeholder: 'Choose category',
        options: categoryOptions,
        step: 3
      }
    ];
  }

  buildInventoryFormSchema(selectedSupplyId?: number): FormFieldSchema[] {
    const supplyOptions = this.supplies.map(s => ({
      value: s.id,
      label: s.name
    }));

    const schema: FormFieldSchema[] = [
      {
        name: 'supplyId',
        label: this.translate.instant('inventory.supply'),
        type: 'select',
        placeholder: this.translate.instant('inventory.supply'),
        options: supplyOptions
      },
      {
        name: 'stock',
        label: 'Stock',
        type: 'number',
        placeholder: 'Stock'
      }
    ];

    if (selectedSupplyId) {
      const selected = this.supplies.find(s => s.id === selectedSupplyId);
      if (selected?.perishable) {
        schema.push({
          name: 'expiration_date',
          label: this.translate.instant('inventory.expirationDate'),
          type: 'date',
          placeholder: this.translate.instant('inventory.expirationDate')
        });
      }
    }

    return schema;
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.categoryService.getAllCategories();
  }

  async loadSupplies(): Promise<void> {
    this.supplies = await this.customSupplyService.getAll();
  }

  async loadBatches(): Promise<void> {
    this.batches = await this.batchService.getAllBatchesWithSupplies();
  }

  openCreateModal(): void {
    this.modalService.open({
      title: this.translate.instant('inventory.createSupply'),
      contentComponent: CreateCustomSupplyComponent
    }).afterClosed().subscribe(async result => {
      if (result) {
        await this.loadSupplies();
        await this.loadBatches();
        this.snackBar.open('Supply created', 'Close', { duration: 3000 });
      }
    });
  }

  editSupply(supply: Supply): void {
    this.modalService.open({
      title: this.translate.instant('inventory.editSupply'),
      contentComponent: CreateAndEditSupplyComponent,
      schema: this.formSchema,
      initialData: {...supply},
      mode: 'edit'
    }).afterClosed().subscribe(async result => {
      if (result) {
        const updated = Supply.fromForm(result, supply.user_id);
        await this.supplyService.updateSupply(supply.id, updated);
        await this.loadSupplies();
        await this.loadBatches();
        this.snackBar.open('Supply updated', 'Close', { duration: 3000 });
      }
    });
  }

  deleteSupply(supply: Supply): void {
    this.modalService.open({
      title: 'Confirm deletion',
      contentComponent: DeleteComponent,
      width: '25rem',
      initialData: {label: supply.name}
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        await this.supplyService.deleteSupply(supply.id);
        await this.loadSupplies();
        await this.loadBatches();
        this.snackBar.open('Supply deleted', 'Close', { duration: 3000 });
      }
    });
  }

  editBatch(batch: Batch): void {
    const initialBatchData = {
      id: batch.id,
      supplyId: batch.supplyId,
      stock: batch.stock,
      expiration_date: batch.expiration_date,
      user_id: batch.user_id
    };


    const dialogRef = this.modalService.open({
      title: this.translate.instant('inventory.editSupplyTitle'),
      contentComponent: AddBatchToInventoryComponent,
      schema: this.buildInventoryFormSchema(batch.supplyId),
      initialData: initialBatchData,
      mode: 'edit',
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
      instance?.supplyChange.subscribe((supplyId: number) => {
        instance.baseSchema = this.buildInventoryFormSchema(supplyId);
        instance.updateSchema();
      })
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        //User ID is hardcoded as 1 for now, should be replaced with actual user ID logic
        const updated = Batch.fromForm(result, 1); // 1 = user_id temporal
        await this.batchService.updateBatch(batch.id, updated);
        await this.loadSupplies();
        await this.loadBatches();
        this.snackBar.open('Batch updated', 'Close', { duration: 3000 });
      }
    });
  }

  deleteBatch(batch: Batch): void {
    this.modalService.open({
      title: 'Confirm deletion',
      contentComponent: DeleteComponent,
      width: '25rem',
      label: 'delete ' + batch.supply?.description
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        await this.batchService.deleteBatch(batch.id);
        await this.loadSupplies();
        await this.loadBatches();
      }
    });
  }


  openAddSupplyToInventory(): void {
    const dialogRef = this.modalService.open({
      title: this.translate.instant('inventory.addInventoryTitle'),
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
        const selectedSupply = this.supplies.find(s => s.id === result.supplyId);

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

        const batch = Batch.fromForm(result, 1); //trabaja con inventory_id pero no lyo usa en este caso, esta pendiente de modificar
        await this.batchService.createBatch(batch);

        this.snackBar.open('Batch registered', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });

        await this.loadSupplies();
        await this.loadBatches();
      }
    });
  }
}
