import {Ingredient} from "../models/ingredient";

export class ShoppingListService{
   private Ingredients: Ingredient[]=[];

   addItem (name: string , amount: number){
     this.Ingredients.push(new Ingredient(name, amount));
     console.log(this.Ingredients);
   }

   addItems(items: Ingredient[]){
     this.Ingredients.push(...items);  //... means we'll have individual elements instead of array of element. We have a list of elements instead of array of element
   }

   getItems(){
     return this.Ingredients.slice();
   }

   removeItem(index: number){
     this.Ingredients.splice(index,1);
   }
}
