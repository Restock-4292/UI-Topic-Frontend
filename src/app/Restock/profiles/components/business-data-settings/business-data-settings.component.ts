import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';

import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../model/profile.entity';

@Component({
  selector: 'app-business-data-settings',
  imports: [
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelect,
    MatOption,
    MatChipsModule,
    NgForOf,
    FormsModule,
    MatIcon
  ],
  templateUrl: './business-data-settings.component.html',
  styleUrl: './business-data-settings.component.css'
})

export class BusinessDataSettingsComponent {
  profile: Profile;
  selectedCategories: string[] = [];
  categories: string[] = ['Fast Food', 'Beverages', 'Desserts', 'Grill', 'Pizzeria', 'Buffet'];

  constructor(private profileService: ProfileService) {
    const current = this.profileService.getCurrentProfile();
    this.profile = { ...current };
    this.selectedCategories = [...current.companyCategories];
  }

  removeCategory(category: string) {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);
  }

  saveChanges() {
    const updatedProfile: Profile = {
      ...this.profile,
      companyCategories: [...this.selectedCategories] // aseguramos copia
    };

    this.profileService.updateProfile(updatedProfile);
  }

  onSelectionChange() {
  }
}

