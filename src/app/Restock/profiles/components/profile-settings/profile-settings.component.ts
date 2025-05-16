import { Component } from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {SecuritySettingsComponent} from '../security-settings/security-settings.component';
import {PersonalDataSettingsComponent} from '../personal-data-settings/personal-data-settings.component';
import { MatCardContent, MatCardModule} from '@angular/material/card';
import {BusinessDataSettingsComponent} from '../business-data-settings/business-data-settings.component';


@Component({
  selector: 'app-profile-settings',
  imports: [
    MatTabGroup,
    MatTabsModule,
    SecuritySettingsComponent,
    PersonalDataSettingsComponent,
    MatCardContent,
    MatCardModule,
    BusinessDataSettingsComponent
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {

}
