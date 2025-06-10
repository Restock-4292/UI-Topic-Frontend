import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule
  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent implements OnInit {
  @Input() hideState: boolean = false;
  @Input() modelValue: boolean = true;
  @Output() modelValueChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();

  orderForm: FormGroup;

  // Pasos y estados estáticos
  steps: string[] = ["On hold", "Preparing", "On the way", "Delivered"];
  statusToStepIndex: { [key: number]: number } = { 1: 0, 2: 1, 3: 2, 4: 3 };
  stepIndexToStatus: { [key: number]: number } = { 0: 1, 1: 2, 2: 3, 3: 4 };
  currentIndex: number = 0;
  draggingIndex: number | null = null;

  // Datos constantes de ejemplo (estáticos)
  constantOrderData = {
    order: {
      id: 10,
      description: 'Pedido semanal de insumos.',
      estimatedShipDate: new Date('2025-06-20'),
      estimatedShipTime: new Date('2025-06-20T10:30:00'),
      stateId: 2
    }
  };

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      description: [''],
      estimatedShipDate: [null],
      estimatedShipTime: [null]
    });
  }

  ngOnInit(): void {
    this.initializeCurrentState();
    this.initializeForm();
  }

  initializeCurrentState(): void {
    const stateId = this.constantOrderData.order.stateId;
    this.currentIndex = this.statusToStepIndex[stateId] || 0;
  }

  initializeForm(): void {
    const order = this.constantOrderData.order;
    this.orderForm.patchValue({
      description: order.description,
      estimatedShipDate: order.estimatedShipDate,
      estimatedShipTime: order.estimatedShipTime
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    this.currentIndex = index;
    this.draggingIndex = null;
  }

  onDragStart(event: DragEvent): void {
    this.draggingIndex = this.currentIndex;
  }

  onClose(): void {
    this.modelValue = false;
    this.modelValueChange.emit(this.modelValue);
    this.close.emit(true);
  }

  onSubmit(): void {
    const formValue = this.orderForm.value;
    const updateData = {
      order: this.constantOrderData.order,
      newEstimatedShipDate: formValue.estimatedShipDate,
      newEstimatedShipTime: formValue.estimatedShipTime,
      newDescription: formValue.description,
      newState: this.stepIndexToStatus[this.currentIndex]
    };

    console.log('Data enviada:', updateData);
    this.modelValue = false;
    this.modelValueChange.emit(this.modelValue);
    this.close.emit(true);
  }

  getProgressWidth(): string {
    return `${(this.currentIndex / (this.steps.length - 1)) * 100}%`;
  }

  isStepCompleted(index: number): boolean {
    return this.currentIndex > index;
  }

  isStepActive(index: number): boolean {
    return this.currentIndex === index;
  }

  isStepPending(index: number): boolean {
    return this.currentIndex < index;
  }
}
