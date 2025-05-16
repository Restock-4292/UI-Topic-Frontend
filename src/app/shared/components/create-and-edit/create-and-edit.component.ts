import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-and-edit',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './create-and-edit.component.html',
  styleUrls: ['./create-and-edit.component.css']
})
export class CreateAndEdit {
  @Input() isEdit = false;
  @Input() title = '';

  @ContentChild('formFields') formFields!: TemplateRef<any>;
}
