import { ToastrService } from 'ngx-toastr';
import { PaymentsModel } from './../../shared/models/payments-model';
import {Action} from "@ngrx/store";
import { Update } from '@ngrx/entity';

export enum PaymentActionTypes {
    
    LOAD_PAYMENTS ="[Payments] Load Payments",
    LOAD_PAYMENTS_SUCCESS = "[Payments] Load Payments Success",
    LOAD_PAYMENTS_FAILURE = "[Payments] Load Payments Failed",

    LOAD_PAYMENT ="[Payments] Load Payment",
    LOAD_PAYMENT_SUCCESS = "[Payments] Load Payment Success",
    LOAD_PAYMENT_FAILURE = "[Payments] Load Payment Failed",

    CREATE_PAYMENT ="[Payments] Create Payment",
    CREATE_PAYMENT_SUCCESS = "[Payments] Create Payment Success",
    CREATE_PAYMENT_FAILURE = "[Payments] Create Payment Failed",

    UPDATE_PAYMENT ="[Payments] Update Payment",
    UPDATE_PAYMENT_SUCCESS = "[Payments] Update Payment Success",
    UPDATE_PAYMENT_FAILURE = "[Payments] Update Payment Failed",

    DELETE_PAYMENT ="[Payments] Delete Payment",
    DELETE_PAYMENT_SUCCESS = "[Payments] Delete Payment Success",
    DELETE_PAYMENT_FAILURE = "[Payments] Delete Payment Failed",
}

export class LoadPayments implements Action{
    readonly type = PaymentActionTypes.LOAD_PAYMENTS;
}

export class LoadPaymentsSuccess implements Action{
    readonly type = PaymentActionTypes.LOAD_PAYMENTS_SUCCESS;
    constructor(public payload: PaymentsModel[]){}
}

export class LoadPaymentsFailure implements Action{
    readonly type = PaymentActionTypes.LOAD_PAYMENTS_FAILURE;
    constructor(public payload:string){}
}


export class LoadPayment implements Action{
    readonly type = PaymentActionTypes.LOAD_PAYMENT;
    constructor(public payload:number){}
}

export class LoadPaymentSuccess implements Action{
    readonly type = PaymentActionTypes.LOAD_PAYMENT_SUCCESS;
    constructor(public payload: PaymentsModel){}
}

export class LoadPaymentFailure implements Action{
    readonly type = PaymentActionTypes.LOAD_PAYMENT_FAILURE;
    constructor(public payload:string){}
}


export class CreatePayment implements Action{
    readonly type = PaymentActionTypes.CREATE_PAYMENT;
    constructor(public payload:PaymentsModel){}
}

export class CreatePaymentSuccess implements Action{
    readonly type = PaymentActionTypes.CREATE_PAYMENT_SUCCESS;
    constructor(public payload: PaymentsModel){
        
        
    }
}

export class CreatePaymentFailure implements Action{
    readonly type = PaymentActionTypes.CREATE_PAYMENT_FAILURE;
    constructor(public payload:string){}
}


export class UpdatePayment implements Action{
    readonly type = PaymentActionTypes.UPDATE_PAYMENT;
    constructor(public payload:PaymentsModel){}
}

export class UpdatePaymentSuccess implements Action{
    readonly type = PaymentActionTypes.UPDATE_PAYMENT_SUCCESS;
    constructor(public payload: Update<PaymentsModel>){}
}

export class UpdatePaymentFailure implements Action{
    readonly type = PaymentActionTypes.UPDATE_PAYMENT_FAILURE;
    constructor(public payload:string){}
}


export class DeletePayment implements Action{
    readonly type = PaymentActionTypes.DELETE_PAYMENT;
    constructor(public payload:number){}
}

export class DeletePaymentSuccess implements Action{
    readonly type = PaymentActionTypes.DELETE_PAYMENT_SUCCESS;
    constructor(public payload: number){}
}

export class DeletePaymentFailure implements Action{
    readonly type = PaymentActionTypes.DELETE_PAYMENT_FAILURE;
    constructor(public payload:string){}
}





export type actions = 
   LoadPayments 
| LoadPaymentsSuccess
| LoadPaymentsFailure 
| LoadPayment 
| LoadPaymentSuccess 
| LoadPaymentFailure 
| CreatePayment 
| CreatePaymentSuccess 
| CreatePaymentFailure 
| UpdatePayment 
| UpdatePaymentSuccess 
| UpdatePaymentFailure 
| DeletePayment 
| DeletePaymentSuccess 
| DeletePaymentFailure;