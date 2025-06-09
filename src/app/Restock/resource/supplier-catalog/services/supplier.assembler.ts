import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SupplierAssembler {
  toSupplierObject({
                     user,
                     profile,
                     role,
                     categories
                   }: {
    user: any;
    profile: any;
    role: any;
    categories: any[];
  }): any {
    return {
      id: user.id,
      email: user.email,
      name: profile?.name || '',
      address: profile?.business_address || profile?.address || '-',
      avatar: profile?.avatar || '',
      phone: profile?.phone || '',
      contactPerson: profile?.name || '',
      position: profile?.description || '',
      categories: categories.map(c => c.name),
      status: true,
      added: false
    };
  }

  toSupplierObjects({
                      users,
                      profiles,
                      roles,
                      profileCategoryLinks,
                      businessCategories
                    }: {
    users: any[];
    profiles: any[];
    roles: any[];
    profileCategoryLinks: any[];
    businessCategories: any[];
  }): any[] {
    const supplierRole = roles.find(r => r.name === 'supplier');
    if (!supplierRole) return [];
    return users
      .filter(user => String(user.role_id) === String(supplierRole.id))
      .map(user => {
        const profile = profiles.find(p => p.user_id === user.id);
        const profileCatIds = profileCategoryLinks
          .filter(link => link.profile_id === profile?.id)
          .map(link => link.business_category_id);
        const categories = businessCategories.filter(c => profileCatIds.includes(c.id));
        return this.toSupplierObject({
          user,
          profile,
          role: supplierRole,
          categories
        });
      });
  }
}
