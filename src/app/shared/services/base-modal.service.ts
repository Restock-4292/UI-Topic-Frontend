import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class BaseModalService {
  constructor(private dialog: MatDialog) {}

  open(component: any, data: any = {}, config: any = {}) {
    return this.dialog.open(component, {
      width: '500px',
      disableClose: true,
      data,
      ...config
    });
  }
}
