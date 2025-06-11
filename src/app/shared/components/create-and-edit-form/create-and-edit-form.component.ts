import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject, Input, NgZone,
  OnInit, Optional,
  Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

export interface FormFieldSchema {
  name: string;
  label: string;
  type: 'text' | 'number' | 'currency' | 'boolean' | 'file' | 'select' | 'date';
  placeholder: string;
  format?: 'currency';
  options?: { value: any; label: string }[];
}

@Component({
  selector: 'app-create-and-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-and-edit-form.component.html',
  styleUrls: ['./create-and-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for creating and editing forms.
 * This component dynamically generates a form based on the provided schema,
 * allowing users to create or edit data entries.
 */
export class CreateAndEditFormComponent implements OnInit {
  form: any = {};
  /**
   * Event emitter for form submission.
   */
  @Output() submit = new EventEmitter<any>();
  /**
   * Schema for the form fields.
   */
  @Input() schema: FormFieldSchema[] | null = null;
  /**
   * Initial data for the form.
   */
  @Input() initialData: any = null;
  /**
   * Mode of the form, either 'create' or 'edit'.
   */
  @Input() mode: 'create' | 'edit' | null = null;

  /**
   * Constructor for CreateAndEditFormComponent.
   * @param injectedSchema
   * @param injectedInitialData
   * @param injectedMode
   * @param cdr
   */
  constructor(
    @Optional() @Inject('schema') private injectedSchema: FormFieldSchema[] | null,
    @Optional() @Inject('initialData') private injectedInitialData: any,
    @Optional() @Inject('mode') private injectedMode: 'create' | 'edit' | null,
    private cdr: ChangeDetectorRef,
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {
    if (!this.schema) {
      this.schema = this.injectedSchema ?? [];
    }

    if (this.mode === null) {
      this.mode = this.injectedMode ?? 'create';
    }

    if (this.initialData === null) {
      this.initialData = this.injectedInitialData ?? {};
    }

    this.form = {};

    if (this.initialData) {
      for (const key of Object.keys(this.initialData)) {
        const value = this.initialData[key];

        if (Array.isArray(value)) {
          this.form[key] = value.map(item => ({ ...item }));
        } else if (typeof value === 'object' && value !== null) {
          this.form[key] = { ...value };
        } else {
          this.form[key] = value;
        }
      }
    }

    this.cdr.markForCheck();
    this.emitForm();
  }

  handleUpload(event: any, fieldName: string): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uitopic');

    fetch('https://api.cloudinary.com/v1_1/dvspiemtu/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.form[fieldName] = data.secure_url;
        this.emitForm();
        this.cdr.markForCheck();
      })
      .catch(error => console.error('❌ Upload failed:', error));
  }

  emitForm(): void {
    this.submit.emit(this.form);
  }
}
