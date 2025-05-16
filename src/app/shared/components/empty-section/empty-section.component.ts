import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-section',
  imports: [],
  templateUrl: './empty-section.component.html',
  styleUrl: './empty-section.component.css'
})
export class EmptySection {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon?: string;
}
