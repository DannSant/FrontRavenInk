import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem } from '../../models/inventoryItems';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styles: []
})
export class CatalogComponent implements OnInit {

  items:InventoryItem[]=[];
  subcategory:string="";

  constructor(
    public _alert:AlertService,
    public _inventory:InventoryService,
    public activatedRoute:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:any)=>{
      let id=params.id;
      if(id==0||id ==undefined || isNaN(id)){
        console.error("Id no es correcto");
        console.log(id);
        this.router.navigate(["/home"]);
      }
      this._inventory.getItemsBySubcategory(id).subscribe((resp:any)=>{
        
        if(resp.ok){
          this.items=resp.data;
          if(resp.data.length>0){
            this.subcategory = resp.data[0].subcategory_name;
          }
        }
      });

      
    })
  }
  }

