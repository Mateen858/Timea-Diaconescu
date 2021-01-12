import { PaymentsModel } from './../../shared/models/payments-model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as paymentActions from "../state/payments.actions";
import * as fromPayments from "../state/payments.reducer";

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  payments$: Observable<PaymentsModel[]>;
  errors$:Observable<string>;

  constructor(private store:Store<fromPayments.AppState>) { }

  

  ngOnInit() {
    this.store.dispatch(new paymentActions.LoadPayments());
    this.payments$ = this.store.pipe(select(fromPayments.getPayments));
    this.errors$ = this.store.pipe(select(fromPayments.getPaymentsError));
    // this.store.subscribe(state=>{this.payments = state.payments.payments});
  }

}
