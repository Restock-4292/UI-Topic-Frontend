import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {
  CreateAndEditFormComponent,
  FormFieldSchema
} from '../../../../../shared/components/create-and-edit-form/create-and-edit-form.component';
import {SupplySelectorComponent} from '../supply-selector/supply-selector.component';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-create-and-edit-recipe',
  imports: [
    SupplySelectorComponent,
    CreateAndEditFormComponent,
    FormsModule,
    MatButton
  ],
  templateUrl: './create-and-edit-recipe.component.html',
  styleUrl: './create-and-edit-recipe.component.css'
})
export class CreateAndEditRecipeComponent implements OnInit {
  form: any = {};
  supplies: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateAndEditRecipeComponent>,
    @Inject('schema') public schema: FormFieldSchema[],
    @Inject('initialData') public initialData: any,
    @Inject('mode') public mode: 'create' | 'edit'
  ) {}

  ngOnInit(): void {
    if (this.initialData) {
      const { supplies = [], ...rest } = this.initialData;
      this.form = { ...rest };
      this.supplies = supplies.map((s: any) => ({ ...s }));
    }
  }

  handleFormChange(updatedForm: any): void {
    this.form = updatedForm;
  }

  handleSuppliesChange(updatedSupplies: any[]): void {
    this.supplies = updatedSupplies;
  }

  onSubmit(): void {
    this.dialogRef.close({
      ...this.form,
      supplies: this.supplies
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
