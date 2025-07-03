import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { Batch } from '../../model/batch.entity';

@Component({
  selector: 'app-batch-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslatePipe],
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Batch,
    @Optional() private dialogRef?: MatDialogRef<BatchDetailsComponent>
  ) {}

  close(): void {
    this.dialogRef?.close();
  }
}
