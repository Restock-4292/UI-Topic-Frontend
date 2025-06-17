import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CreateAndEditFormComponent,
  FormFieldSchema
} from '../../../../../shared/components/create-and-edit-form/create-and-edit-form.component';
import {DeleteComponent} from '../../../../../shared/components/delete/delete.component';
import {EmptySectionComponent} from '../../../../../shared/components/empty-section/empty-section.component';
import {RecipeService} from '../../services/recipe.service';
import {RecipeSupplyService} from '../../services/recipe-supply.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Recipe} from '../../model/recipe.entity';
import {firstValueFrom} from 'rxjs';
import {BaseModalService} from '../../../../../shared/services/base-modal.service';
import {CreateAndEditRecipeComponent} from '../../components/create-and-edit-recipe/create-and-edit-recipe.component';

@Component({
  selector: 'app-restaurant-recipes-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    EmptySectionComponent,
    FormsModule,
    MatIconButton,
    MatButton,
    MatInput
  ],
  templateUrl: './restaurant-recipes-overview.component.html',
  styleUrls: ['./restaurant-recipes-overview.component.css']
})
export class RestaurantRecipesOverviewComponent {

  recipes: any[] = [];
  search: string = '';
  formVisible = false;
  sortByPrice = false;

  constructor(
    private recipeService: RecipeService,
    private recipeSupplyService: RecipeSupplyService,
    private modalService: BaseModalService
  ) {
  }

  get filteredRecipes(): any[] {
    let filtered = this.recipes.filter(r =>
      r.name.toLowerCase().includes(this.search.toLowerCase())
    );

    return this.sortByPrice
      ? filtered.sort((a, b) => a.total_price - b.total_price)
      : filtered;
  }

  formSchema: FormFieldSchema[] = [
    {name: 'name', label: 'Name', type: 'text', placeholder: 'Recipe name'},
    {name: 'description', label: 'Description', type: 'text', placeholder: 'Short description'},
    {name: 'total_price', label: 'Total Price (S/.)', type: 'currency', placeholder: 'e.g. 29.90', format: 'currency'},
    {name: 'image_url', label: 'Dish Image', type: 'file', placeholder: 'Upload an image'}
  ];

  async loadRecipes(): Promise<void> {
    const recipes = await firstValueFrom(this.recipeService.getAll());

    this.recipes = await Promise.all(
      recipes.map(async (r: Recipe) => {
        const supplies = await firstValueFrom(this.recipeSupplyService.getByRecipe(r.id));
        return {...r, supplies};
      })
    );
  }



  openCreateDialog(): void {
    const initialRecipeData = {
      name: '',
      description: '',
      total_price: 0,
      image_url: '',
      user_id: 1,
      supplies: []
    };

    this.modalService.open({
      title: 'Create Recipe',
      contentComponent: CreateAndEditRecipeComponent,
      schema: this.formSchema,
      initialData: initialRecipeData,
      mode: 'create'
    }).afterClosed().subscribe(async result => {
      if (result) {
        const { supplies, ...recipeData } = result;

        const created = await firstValueFrom(this.recipeService.create(recipeData));
        await firstValueFrom(this.recipeSupplyService.bulkCreate(created.id, supplies));
        await this.loadRecipes();
      }
    });

  }


  openEditDialog(recipe: any): void {
    firstValueFrom(this.recipeSupplyService.getByRecipe(recipe.id)).then(supplies => {
      const initialRecipeData = {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description || '',
        total_price: recipe.total_price,
        image_url: recipe.image_url,
        user_id: recipe.user_id,
        supplies: supplies.map(s => ({
          supply_id: s.supply_id,
          quantity: s.quantity
        }))
      };

      this.modalService.open({
        title: 'Edit Recipe',
        contentComponent: CreateAndEditRecipeComponent,
        schema: this.formSchema,
        initialData: initialRecipeData,
        mode: 'edit'
      }).afterClosed().subscribe(async result => {
        if (result) {
          const { supplies, ...recipeData } = result;

          await firstValueFrom(this.recipeService.update(recipe.id, recipeData));
          await firstValueFrom(this.recipeSupplyService.deleteByRecipe(recipe.id));
          await firstValueFrom(this.recipeSupplyService.bulkCreate(recipe.id, supplies));
          await this.loadRecipes();
        }
      });
    });
  }


  openDeleteDialog(recipe: any): void {
    this.modalService.open({
      title: 'Confirm deletion',
      contentComponent: DeleteComponent,
      width: '25rem',
      label: 'delete ' +  recipe.name
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        await firstValueFrom(this.recipeService.delete(recipe.id));
        await this.loadRecipes();
      }
    });
  }

  closeForm() {
    this.formVisible = false;
  }

  ngOnInit(): void {
    this.loadRecipes();
  }
}
