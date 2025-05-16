import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Supply } from '../../model/supply.entity';
import {BaseModal} from '../../../../../shared/components/base-modal/base-modal.component';
import {CreateAndEdit} from '../../../../../shared/components/create-and-edit/create-and-edit.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {mockCategories} from '../../../../../shared/mocks/categories.mock';
import { mockUnits} from '../../../../../shared/mocks/units-measurements.mock';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardActions} from '@angular/material/card';
@Component({
  selector: 'app-supply-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatCardActions
  ],
  templateUrl: './supply-form-modal.component.html',
  styleUrls: ['./supply-form-modal.component.css']
})
export class SupplyFormModal {
  categories = mockCategories;
  units = mockUnits;
  @Input() isEdit: boolean = true;
  @Input() form: Partial<Supply> = {};
  @Input() isOpen: boolean = false;

  @Output() save = new EventEmitter<Partial<Supply>>();

  constructor(
    private dialogRef: MatDialogRef<SupplyFormModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = data.form || {};
    this.isEdit = data.isEdit || false;
  }

  close() {
    this.dialogRef.close();
  }

  submitForm() {
    // Validación simple
    if (!this.form.name || !this.form.category_id || !this.form.unit_measurement_id) return;

    this.dialogRef.close(this.form);
  }
}
