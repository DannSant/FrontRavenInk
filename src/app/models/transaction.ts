
export class Transaction  {

    constructor(
        public id?:number,
        public operation_date?:Date,
        public item?:number,
        public qty?:number,
        public current_price?:number,
        public type?:number,
        public user?:number,
        public status?:string,
        public total_payed?:number
    ) {
      
  
    }



}