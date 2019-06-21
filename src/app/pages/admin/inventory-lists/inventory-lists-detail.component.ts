import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryListsService } from 'src/app/services/inventory-lists.service';
import { NgForm } from '@angular/forms';
import { InventoryItem } from 'src/app/models/inventoryItems';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-lists-detail',
  templateUrl: './inventory-lists-detail.component.html',
  styles: []
})
export class InventoryListsDetailComponent implements OnInit {

  list:any={};
  lists:any={};
  items:InventoryItem[]=[];
  itemsToSave:string="";
 
   constructor(
     public _alert:AlertService,
     public _inventoryListService:InventoryListsService,
     public _invenotryService:InventoryService,
     public router:Router,
     public activatedRoute:ActivatedRoute,
   ) { }
 
   ngOnInit() {
     this.loadList();
 
   }
 
 
   loadList(){
     this.activatedRoute.params.subscribe((params:any)=>{
       let listId = params.id;
 
       if (listId=='new'){
         this.cleanForm();
         this.loadItems();
         return;
       }
       if(!listId){
         this._alert.showAlert("Error","No se ha recibido un id de lista, favor de ingresar correctamente desde la opcion Lista de items","error");
         this.router.navigate(["/inventoryList"]);
         return;
       }
 
 
 
       this._inventoryListService.getInventoryListsAll().subscribe((resp:any)=>{
        
         if(resp.ok){
           this.lists = resp.data
           this.list=this.lists[listId];
           this.buildItemsString();
           this.loadItems();
 
         }
       });
     });
   }

   loadItems(){
     this._invenotryService.getInventoryItemsAll().subscribe((resp:any)=>{
       
       if(resp.ok){
         this.items=resp.data;
         
       }
     })
   }
 
   cleanForm(){
     this.list={};     
   }

   buildItemsString(){
    let itemsObj = this.list.items;
    for (let itemObj of itemsObj){
      this.itemsToSave+=itemObj + ";";
    }
   }
 
   saveItem(f:NgForm){
     if(f.invalid){
       this._alert.showAlert("Error","No se han capturados todos los campos, favor de verificar los campos con asterico (*) ya que son obligatorios","error");
       return;
     }

     if(!this.validateCode()){
      this._alert.showAlert("Error","Codigo invalido, favor de no usar espacios, numeros ni caracteres especiales","error");
      return;
     }
     
     this.list.items = this.itemsToSave.split(";");
     this.list.items.pop();

     
 
     this._inventoryListService.saveList(this.list).subscribe((resp:any)=>{
       if(resp.ok){
         this._alert.showAlert("Lista guardada","La lista se ha guardado con exito","success");
         this.router.navigate(['/inventoryList']);
       }else {
         console.warn(resp);
         this._alert.showAlert("Error","No se ha logrado guarda con exito el item, favor de verificar los campos y haber iniciado sesion correctamente","error");
       }
     });
   }

   validateCode(){
     let valid=true;
     let letters = /^[A-Za-z]+$/;
     if(this.list.code.match(letters))
      {
        valid=true;
      }
      else
      {
        valid=false;
      }
      return valid;
   }

   addItem(event){
    this.itemsToSave+=event.id+";";
   }

}
