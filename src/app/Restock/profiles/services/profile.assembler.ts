import { Profile } from '../model/profile.entity';

export class ProfileAssembler {
  static fromDto(dto: any): Profile {
    const profile = new Profile();
    profile.name = dto.name;
    profile.lastName = dto.last_name;
    profile.email = '';
    profile.phone = dto.phone;
    profile.address = dto.address;
    profile.country = dto.country;
    profile.description = dto.description;
    profile.companyName = dto.business_name;
    profile.companyAddress = dto.business_address;
    profile.companyCategories = [];
    profile.image = dto.avatar;
    return profile;
  }
}
