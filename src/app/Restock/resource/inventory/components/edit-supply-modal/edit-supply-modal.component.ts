import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Supply } from '../../model/supply.entity';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-edit-supply-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule
  ],
  templateUrl: './edit-supply-modal.component.html',
  styleUrls: ['./edit-supply-modal.component.css']
})
export class EditSupplyModalComponent {
  form = { ...this.data.supply };
  selectedSupply = this.form; // ya tienes los datos del supply

  constructor(
    private dialogRef: MatDialogRef<EditSupplyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supply: Supply }
  ) {}

  get isPerishable(): boolean {
    return this.form.perishable === true;
  }

  submit(): void {
    this.dialogRef.close(this.form);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
