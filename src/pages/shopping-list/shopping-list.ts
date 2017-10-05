import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
//import {SLOptionsPage} from "../../pages/shopping-list/sl-options/sl-options";
import {SLOptionsPage} from "../shopping-list/sl-options/sl-options";
import {AuthService} from "../../services/auth";
/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ListItems: Ingredient[];

  constructor (private slService: ShoppingListService, private popoverCtrl: PopoverController,
               private authService:AuthService){}
  /*
    http://blog.ionic.io/navigating-lifecycle-events/
      ionViewWillEnter: It’s fired when entering a page, before it becomes the active one. Use it for tasks you want to do every time you enter in the view (setting event listeners, updating a table, etc.).
  */

  ionViewWillEnter(){
    this.loadItems();
  }

  private loadItems(){
    this.ListItems=this.slService.getItems();
  }


  onAddItem(form: NgForm){
    console.log (form);
    this.slService.addItem(form.value.ingredientName,form.value.amount);
    form.reset();
    this.loadItems();

  }

  onCheckItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions (event: MouseEvent){
    const popover=this.popoverCtrl.create(SLOptionsPage); //popover is like a modal
    popover.present({ev:event});
    popover.onDidDismiss(data=>{
      if (data.action=='load'){


      }else{
        this.authService.getActiveUser().getToken()
          .then((token: string)=>{
            this.slService.storeList(token)
            .subscribe(
              ()=>console.log ('Success!'),
              error=>{
                console.log(error);
              }
            );

          });
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

}
