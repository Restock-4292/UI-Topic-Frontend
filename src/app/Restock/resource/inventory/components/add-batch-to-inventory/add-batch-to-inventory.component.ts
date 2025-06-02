import {Component, Inject, OnInit} from '@angular/core';
import {
  CreateAndEditFormComponent, FormFieldSchema
} from '../../../../../shared/components/create-and-edit-form/create-and-edit-form.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Supply} from '../../model/supply.entity';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-batch-to-inventory',
  standalone: true,
  templateUrl: './add-batch-to-inventory.component.html',
  imports: [CreateAndEditFormComponent, MatButtonModule, FormsModule]
})
export class AddBatchToInventoryComponent implements OnInit {
  form: any = {};
  supplies: Supply[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddBatchToInventoryComponent>,
    @Inject('schema') public schema: FormFieldSchema[],
    @Inject('initialData') public initialData: any,
    @Inject('mode') public mode: 'create' | 'edit',
    @Inject('supplies') public injectedSupplies: Supply[]
  ) {}

  ngOnInit(): void {
    this.form = { ...this.initialData };
    this.supplies = this.injectedSupplies;
  }

  handleFormChange(updatedForm: any): void {
    this.form = updatedForm;
  }

  onSubmit(): void {
    const selected = this.supplies.find(s => s.id === this.form.supply_id);

    if (selected?.perishable && !this.form.expiration_date) {
      alert('Expiration date is required for perishable items');
      return;
    }

    this.dialogRef.close(this.form);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

