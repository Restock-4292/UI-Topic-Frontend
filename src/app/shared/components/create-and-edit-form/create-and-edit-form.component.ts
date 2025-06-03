import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject, NgZone,
  OnInit,
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
export class CreateAndEditFormComponent implements OnInit {
  form: any = {};
  @Output() submit = new EventEmitter<any>();

  constructor(
    @Inject('schema') public schema: FormFieldSchema[],
    @Inject('initialData') public initialData: any,
    @Inject('mode') public mode: 'create' | 'edit',
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
