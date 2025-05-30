import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalComponent {
  @Input() title: string = '';
  @Input() width: string = '35rem';
  @Input() closable: boolean = true;
  @Input() visible: boolean = false;

  @Output() close = new EventEmitter<void>();

  handleClose(): void {
    if (this.closable) this.close.emit();
  }
}
