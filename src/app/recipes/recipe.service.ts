import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pav bhaji',
      'Pav bhaji is a fast food dish from India consisting of a thick vegetable curry served with a soft bread roll. Vegetables in the curry may include potatoes, onions, carrots, chillies, peas, bell peppers, and tomatoes.',
      'https://media.istockphoto.com/photos/indian-spicy-fast-food-pav-bhaji-with-bread-picture-id517688604?k=6&m=517688604&s=612x612&w=0&h=Npn6bBN32p0QEMYMh2BB02EoeSjACYw7aCGBw82eic4=',
      [
        new Ingredient('Potatoes', 1),
        new Ingredient('Onions', 2)
      ]),
    new Recipe('Dal baati',
      'Dal baati is an Indian dish of dal and baati. It is popular in Rajasthan, Maharashtra’s Khandesh and Vidarbha region, Gujarat, Uttar Pradesh and Madhya Pradesh. Dal is prepared using tuvaar dal, chana dal, mung dal, moth dal, or urad dal.',
      'https://thumbs.dreamstime.com/b/indian-cuisine-dal-baati-popular-rajasthan-uttar-pradesh-madhya-pradesh-indian-cuisine-dal-baati-105495455.jpg',
      [
        new Ingredient('Chana Dal', 2),
        new Ingredient('Mung Dal', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
