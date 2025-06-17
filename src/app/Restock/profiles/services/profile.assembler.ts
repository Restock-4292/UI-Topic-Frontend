import { Profile } from '../model/profile.entity';
export interface ProfileDto {
  id: number;
  name: string;
  last_name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  country: string;
  description: string;
  business_name: string;
  business_address: string;
  avatar: string;
}
export class ProfileAssembler {
  static fromDto(dto: ProfileDto): Profile {
    const profile = new Profile();
    profile.id = dto.id;
    profile.name = dto.name;
    profile.last_name = dto.last_name;
    profile.email = dto.email;
    profile.username = dto.username;
    profile.phone = dto.phone;
    profile.address = dto.address;
    profile.country = dto.country;
    profile.description = dto.description;
    profile.business_name = dto.business_name;
    profile.business_address = dto.business_address;
    profile.avatar = dto.avatar;
    return profile;
  }
}
