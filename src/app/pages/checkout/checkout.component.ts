import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventoryItems';
import { UserService } from '../../services/user.service';
import { InventoryService } from '../../services/inventory.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PayPalConfig, PayPalIntegrationType, PayPalEnvironment } from 'ngx-paypal';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {

  item:InventoryItem={};
  existance:number=0;
  currentPrice:number=0.0;
  transaction:Transaction={}

  public payPalConfig?: PayPalConfig;
  
  constructor(
    public _userService:UserService,
    public _inventoryService:InventoryService,
    public _alert:AlertService,
    public _transactionService:TransactionService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
     
      let id=params.id;
      this.existance=params.qty;
      if(!this._userService.loggedUser){
        this.router.navigate(["/login",'cart',id])
      }else {
        this._inventoryService.getItem(id).subscribe(resp=>{
        
          if(resp.ok){
            this.item=resp.data[0];
            this.initTransaction();
          }
        });
      }
    });
    
  }

  initTransaction(){

    if(this._userService.loggedUser.is_wholesale=="0"){
      this.currentPrice=this.item.public_price;
    }else {
      this.currentPrice=this.item.wholesale_price;
    }

    this.transaction.item = this.item.id;
    this.transaction.qty = this.existance;
    this.transaction.current_price=this.currentPrice;
    this.transaction.user = this._userService.loggedUser.id;
    this.transaction.type=1;
    this.transaction.total_payed = this.currentPrice*this.existance;
    console.log(this.transaction)
    this.initConfig();

  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'ASHhJXGNC2c7IPnBzzNLXPd2AVhDsAgqiXesSJxO48Z3anWgkrkqe572t5yTofcBTSBNzJ6sfpKUauQz'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
        console.log(data,actions);
        this.finishTransaction();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
        console.log(err);
        this._alert.showAlert("Error","Ocurrió un error al procesar la transaccion, verifique su cuenta de Paypal","error")
      },
      transactions: [{
        amount: {
          currency: 'MXN',
          total: this.transaction.total_payed
        }
      }]
    });
  }

  finishTransaction(){
    this._transactionService.registerTransaction(this.transaction).subscribe((resp:any)=>{
      this._alert.showAlert("Exito","La transaccion se realizó con exito","success")
      console.log(resp)
    })
  }

}
