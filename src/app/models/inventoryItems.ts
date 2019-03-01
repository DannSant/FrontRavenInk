export class InventoryItem {

    constructor(
        public id?:number,
        public code?:string,
        public category?:string,
        public item_name?:string,
        public description?:string,
        public public_price?:number,
        public wholesale_price?:number,
        public existance?:number,
        public status?:string,
        public img?:string,
        public subcategory?:string
    ) {}
}
