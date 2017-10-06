import { Http, Response } from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';

import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import {AuthService} from "../services/auth";




@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(private http: Http, private authService:AuthService){}

  addRecipe(title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]) {
      this.recipes.push(new Recipe(title, description, difficulty, ingredients));
      console.log(this.recipes);
    }

    getRecipes() {
      return this.recipes.slice();
    }

    updateRecipe(index: number,
      title: string,
      description: string,
      difficulty: string,
      ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
      }

      removeRecipe(index: number) {
        this.recipes.splice(index, 1);
      }

      storeList(token: string){
        const userId=this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-recipebpook.firebaseio.com/'+ userId + '/recipes.json?auth='+token, this.recipes)
        .map((response:Response)=> response.json());//if you use one line format no return is required, javascript ES6 syntex

      }

      fetchList(token: string){
        const userId=this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-recipebpook.firebaseio.com/'+ userId + '/recipes.json?auth='+token)
        .map((response:Response)=>{
          return response.json();
        })
        .do((recipes: Recipe[])=>{//runs on the resulst of ovservable. it is a listener in between. It allows us to use the response data if someone else subscribes
          if(recipes){
            this.recipes=recipes;
          }else{
            this.recipes=[];
          }
        });

      }
    }
