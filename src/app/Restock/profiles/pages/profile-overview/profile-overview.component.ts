import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {ProfileSettingsComponent} from '../../components/profile-settings/profile-settings.component';
import {ProfileDetailsComponent} from '../../components/profile-details/profile-details.component';
import {OrderToSupplier} from '../../../resource/orders-to-suppliers/model/order-to-supplier.entity';
import {Profile} from '../../model/profile.entity';
import {User} from '../../../iam/model/user.entity';
import {Business} from '../../model/business.entity';
import {OrderToSupplierService} from '../../../resource/orders-to-suppliers/services/order-to-supplier.service';
import {
  OrderToSupplierBatchService
} from '../../../resource/orders-to-suppliers/services/order-to-supplier-batch.service';
import {BatchService} from '../../../resource/inventory/services/batch.service';
import {UserService} from '../../../iam/services/user.service';
import {ProfileService} from '../../services/profile.service';
import {OrderStateService} from '../../../resource/orders-to-suppliers/services/order-to-supplier-state.service';
import {BaseModalService} from '../../../../shared/services/base-modal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BusinessService} from '../../services/business.service';

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
export class ProfileOverviewComponent implements OnInit {


  profile: Profile = new Profile();
  user: User = new User();
  business: Business = new Business();

  categoriesArray: string[] = [];
  categoriesOptions: string[] = [ 'Food', 'Beverages', 'Electronics', 'Clothing', 'Furniture', 'Health & Beauty', 'Sports & Outdoors', 'Toys & Games' ];

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private businessService: BusinessService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit() {
    await this.loadProfile();
    await this.loadUser();
    await this.loadBusiness();
  }

  async loadProfile() {
    try {
      this.profile = await this.profileService.getProfileById(1); //TODO: Replace with dynamic ID
      this.categoriesArray = this.profile.business?.categories.split(',').map(cat => cat.trim()) || [];
      console.log('Profile loaded:', this.profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async loadUser() {
    try {
      this.user = await this.userService.getUserById(this.profile.user_id);
      console.log('User loaded:', this.user);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }

  async loadBusiness() {
    try {
      this.business = await this.businessService.getBusinessById(this.profile.business_id);
      console.log('Business loaded:', this.business);
    } catch (error) {
      console.error('Error loading business:', error);
    }
  }

  updateProfile(profile: Profile) {

    if(profile === this.profile)
    {
      this.invalidUpdate('No changes detected in profile');
      console.warn('No changes detected in profile. Update skipped.');
      return;
    }

    if(this.profile.id !== profile.id) {
      this.invalidUpdate('Failed to update profile');
      console.error('Profile ID mismatch. Cannot update profile with different ID.');
      return;
    }

    this.profileService.updateProfile(profile.id, profile);
    this.loadProfile();
    this.successfulUpdate('Successful personal data update');

  }

  updateProfileAndBusiness(business: Business) {

    if(this.profile.business_id == business.id)
    {
      const updatedProfile = {
        ...this.profile,
        business: business
      }

      this.profileService.updateProfile(updatedProfile.id, updatedProfile);
      this.businessService.updateBusiness(business.id, business);
      this.loadProfile();
      this.loadBusiness();

      this.successfulUpdate('Successful business data update');
    }
    else
    {
      this.invalidUpdate('Failed to update business data');

      console.error('Business ID mismatch. Cannot update profile with different business ID.');
    }
  }

  updateProfileAndUser(user: User) {

    if(this.profile.user_id == user.id)
    {
      const updatedProfile = {
        ...this.profile,
        user: user
      }
      this.profileService.updateProfile(updatedProfile.id, updatedProfile);
      this.userService.updateUser(user.id, user);
      this.loadProfile();
      this.loadUser();

      this.successfulUpdate('Successful password update');
    }
    else
    {
      this.invalidUpdate('Failed to update password');
      console.error('User ID mismatch. Cannot update profile with different user ID.');
    }
  }

  successfulUpdate(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  invalidUpdate(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }

}
