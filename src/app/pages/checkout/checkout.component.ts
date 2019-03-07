import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventoryItems';
import { UserService } from '../../services/user.service';
import { InventoryService } from '../../services/inventory.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { PayPalConfig, PayPalIntegrationType, PayPalEnvironment } from 'ngx-paypal';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

import {PAYU_ACCOUNT_ID,PAYU_API_KEY,PAYU_CURRENCY,PAYU_MERCHANT_ID} from '../../config/config';
import { NgForm } from '@angular/forms';

declare var OpenPay:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  item:InventoryItem={};
  existance:number=0;
  currentPrice:number=0.0;
  transaction:Transaction={}



  deviceSessionId:string="";
  tokenId:string="";
  holder_name:string="";
  card_number:string="";
  expiration_month:string="";
  expiration_year:string="";
  cvv2:string="";

  //public payPalConfig?: PayPalConfig;

  constructor(
    public _userService:UserService,
    public _inventoryService:InventoryService,
    public _alert:AlertService,
    public _transactionService:TransactionService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) {
    OpenPay.setId('mrn1c9jd00lxgdeeqtod');
    OpenPay.setApiKey('pk_c46d11a83c724a3a91a52fde8934196c');
    OpenPay.setSandboxMode(true);
    //Se genera el id de dispositivo
    this.deviceSessionId= OpenPay.deviceData.setup();
    console.log(this.deviceSessionId);



  }

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

    this.transaction.operation_date = new Date();
    this.transaction.item = this.item.id;
    this.transaction.qty = this.existance;
    this.transaction.current_price=this.currentPrice;
    this.transaction.user = this._userService.loggedUser.id;
    this.transaction.type=1;
    this.transaction.total_payed = this.currentPrice*this.existance;
    this.transaction.status="1";
    this.transaction.reference_id = new Date().getTime().toString();

    //this.transaction.signatureData = `${PAYU_API_KEY}~${PAYU_MERCHANT_ID}~${this.transaction.reference_id}~${this.transaction.total_payed}~${PAYU_CURRENCY}`;
    //console.log(this.transaction)
    //this.initConfig();


  }

  tokenize(f:NgForm){
    this._alert.showWaitWindow("Procesando","Espere un momento, estamos procesando su transaccion");
    OpenPay.token.extractFormAndCreate('payment-form', (response:any)=>{
      this.tokenId= response.data.id;
      this.sendPayment();
    },
    (response:any)=>{
      this._alert.closeWaitWindow();
      var desc = response.data.description != undefined ? response.data.description : response.message;
      this._alert.showAlert("Error","ERROR [" + response.status + "] " + desc,"error");

    }
    );
  }


  sendPayment(){

    let payment = {
      transaction:this.transaction,
      deviceSessionId:this.deviceSessionId,
      tokenId:this.tokenId,
      customer:this._userService.loggedUser
    }

    //console.log(f.value);
    this._transactionService.sendTransactionForm(payment).subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
      if(resp.ok){
        this._alert.showAlert("Exito", "Tu compra está en camino, gracias por tu preferencia","success");
        this.router.navigate(["/home"]);
      }else {
        this._alert.showAlert("Error", "Ha ocurrido un error al procesar tu transaccion","error");
        console.log(resp);
      }

    });
  }
/*
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
  } */

  finishTransaction(){
    this._transactionService.registerTransaction(this.transaction).subscribe((resp:any)=>{
      this._alert.showAlert("Exito","La transaccion se realizó con exito","success")
      console.log(resp)
    })
  }

}
