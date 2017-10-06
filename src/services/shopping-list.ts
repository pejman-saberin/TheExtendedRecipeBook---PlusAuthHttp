import {Ingredient} from "../models/ingredient";
import {AuthService} from "../services/auth";
import { Http, Response } from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService{
  constructor(private authService:AuthService, private http:Http){}
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

   storeList(token:string){
     const userId=this.authService.getActiveUser().uid;
     return this.http.put('https://ionic-recipebpook.firebaseio.com/'+ userId + '/shopping-list.json?auth='+token, this.Ingredients)//to make it secure send auth ?auth=token
     .map((response:Response)=>{
       return response.json();
     });
   }

   fetchList(token:string){
     const userId=this.authService.getActiveUser().uid;
     return this.http.get('https://ionic-recipebpook.firebaseio.com/'+ userId + '/shopping-list.json?auth='+token)
     .map((response:Response)=>{
       return response.json();
     })
     .do((data)=>{//runs on the resulst of ovservable. it is a listener in between. It allows us to use the response data if someone else subscribes
       this.Ingredients=data;
     });
   }
}
