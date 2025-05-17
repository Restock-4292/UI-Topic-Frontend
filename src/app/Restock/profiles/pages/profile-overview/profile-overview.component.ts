import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {ProfileSettingsComponent} from '../../components/profile-settings/profile-settings.component';
import {ProfileDetailsComponent} from '../../components/profile-details/profile-details.component';

@Component({
  selector: 'app-profile-overview',
  imports: [
    MatCard,
    ProfileSettingsComponent,
    ProfileDetailsComponent
  ],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.css'
})
export class ProfileOverviewComponent {

}
