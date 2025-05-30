import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {BaseModalComponent} from '../base-modal/base-modal.component';

@Component({
  selector: 'app-create-and-edit',
  standalone: true,
  imports: [CommonModule, BaseModalComponent, MatDialogModule, MatButtonModule],
  templateUrl: './create-and-edit.component.html',
  styleUrls: ['./create-and-edit.component.css']
})
export class CreateAndEditComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() createTitle: string = 'Create';
  @Input() editTitle: string = 'Edit';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  get title(): string {
    return this.mode === 'create' ? this.createTitle : this.editTitle;
  }

  handleClose(): void {
    this.visibleChange.emit(false);
    this.close.emit();
  }
}
