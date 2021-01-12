import { PaymentsModel } from './../../shared/models/payments-model';
import * as paymentActions from './payments.actions';
import { PaymentsService } from './../../shared/services/payments.service';
import { Observable, of, pipe } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, mergeMap, catchError } from "rxjs/operators"
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PaymentEffect {
    constructor(
        private actions$: Actions,
        private paymentService: PaymentsService,
        private toastrService : ToastrService
    ) { }

    @Effect()
    loadPayments$: Observable<Action> = this.actions$.pipe(
        ofType<paymentActions.LoadPayments>(
            paymentActions.PaymentActionTypes.LOAD_PAYMENTS
        ),
        mergeMap((actions: paymentActions.LoadPayments) =>
            this.paymentService.payments().pipe(
                map((payments: PaymentsModel[]) =>
                new paymentActions.LoadPaymentsSuccess(payments)),
                catchError(err => of(new paymentActions.LoadPaymentsFailure(err)))
            )
        )
    );


    @Effect()
    loadPayment$: Observable<Action> = this.actions$.pipe(
        ofType<paymentActions.LoadPayment>(
            paymentActions.PaymentActionTypes.LOAD_PAYMENT
        ),
        mergeMap((action: paymentActions.LoadPayment) =>
            this.paymentService.payment(action.payload).pipe(
                map((payment: PaymentsModel) =>
                new paymentActions.LoadPaymentSuccess(payment)),
                catchError(err => of(new paymentActions.LoadPaymentFailure(err)))
            )
        )
    );

    @Effect()
    createPayment$: Observable<Action> = this.actions$.pipe(
        ofType<paymentActions.CreatePayment>(
            paymentActions.PaymentActionTypes.CREATE_PAYMENT),
        map((action:paymentActions.CreatePayment)=> action.payload),
        mergeMap( (payment:PaymentsModel) =>
            this.paymentService.create(payment).pipe(
                map((newPayment: PaymentsModel) => {
                    this.toastrService.success("Success", "Created");
                    return new paymentActions.CreatePaymentSuccess(newPayment);
                    
                   

                })
                ,
                
                catchError(err => {
                    this.toastrService.error("error","failed");
                    return of(new paymentActions.CreatePaymentFailure(err));
                })
            )
        )
    );


    @Effect()
    updatePayment$: Observable<Action> = this.actions$.pipe(
        ofType<paymentActions.UpdatePayment>(
            paymentActions.PaymentActionTypes.UPDATE_PAYMENT
        ),
        map((action:paymentActions.UpdatePayment)=>action.payload),
        mergeMap( (payment:PaymentsModel) =>
            this.paymentService.update(payment.id,payment).pipe(
                map((updatePayment: PaymentsModel) =>
                new paymentActions.UpdatePaymentSuccess(
                    {
                        id:updatePayment.id,
                        changes:updatePayment
                    }
                )),
                catchError(err => of(new paymentActions.UpdatePaymentFailure(err)))
            )
        )
    );


    @Effect()
    deletePayment$: Observable<Action> = this.actions$.pipe(
        ofType<paymentActions.DeletePayment>(
            paymentActions.PaymentActionTypes.DELETE_PAYMENT
        ),
        map((action:paymentActions.DeletePayment)=>action.payload),
        mergeMap( (id:number) =>
            this.paymentService.delete(id).pipe(
                map(() =>
                new paymentActions.DeletePaymentSuccess(id)),
                catchError(err => of(new paymentActions.DeletePaymentFailure(err)))
            )
        )
    );

}


// Used rxjs Operators description

//Observable: operator represents an invokable collection of future values. declaring a property observable makes it able to subscribe and whenever it values changes it emits it. 
// of: it is a  creation operator, it used to make a value observeable and and emit it when changed. we pass a normal value to it and it returns observable. 
//pipe: it is an operator to performa an additional operation on a oberservable without chaning it. 
// map: it will iterate over every emitted value by observeable and return a copy of it and will not change the original. 
// mergeMap: it merges the outcome emitted  by map operator from two observeables. 
//catchError: to catch any error occurs in our function or call. 
// ofyype: this operator found in the ngrx library. it is used to filter out the collection according to the type. 


