import { Component, ContentChild, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModal {
  @Input() title = '';
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();

  @ContentChild(TemplateRef) projectedContent!: TemplateRef<any>;

  closeModal(): void {
    this.close.emit();
  }
}
