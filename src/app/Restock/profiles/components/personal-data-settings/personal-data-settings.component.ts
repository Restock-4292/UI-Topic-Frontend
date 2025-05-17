import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Profile} from '../../model/profile.entity';
import {ProfileService} from '../../services/profile.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-personal-data-settings',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './personal-data-settings.component.html',
  styleUrl: './personal-data-settings.component.css'
})
export class PersonalDataSettingsComponent {
  profile: Profile;
  private profileSubject: any;

  constructor(private profileService: ProfileService) {
    this.profile = this.profileService.getCurrentProfile();
  }

  saveChanges() {
    this.profileService.updateProfile(this.profile);
  }
}
