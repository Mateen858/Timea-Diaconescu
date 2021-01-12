export interface PaymentsModel {
    id?:number;
    creditCardNumber:string;
    cardHolder:string;
    expirationDate:Date;
    securityCode:string;
    amount:number;
}
