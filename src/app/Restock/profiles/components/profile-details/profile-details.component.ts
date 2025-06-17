import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../model/profile.entity';

@Component({
  selector: 'app-profile-details',
  imports: [MatCardModule,
    MatIconModule, MatChipsModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  // @Input() profile!: {
  //   name: string;
  //   email: string;
  //   phone: string;
  //   address: string;
  //   description: string;
  //   image: string;
  //  companyName: string;
  //  companyAddress: string;
  //  companyCategories: string[];
  // };
  profile: any = {};

  constructor(private profileService: ProfileService) {
    this.profileService.getByQuery("user_id", 1).subscribe(data => {
      console.log("profile data: ", data);
      this.profile = data;
    });
  }
}
