import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Delete supply</h2>
    <mat-dialog-content>
      Are you sure you want to delete <strong>{{ data.name }}</strong>?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="warn" (click)="confirm()">Delete</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatButtonModule, MatDialogModule]
})
export class ConfirmDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }
}
