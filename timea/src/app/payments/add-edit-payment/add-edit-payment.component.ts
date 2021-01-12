import { PaymentsModel } from './../../shared/models/payments-model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { CreditCardValidators } from 'angular-cc-library';
import { Store } from "@ngrx/store";
import * as paymentActions from "../state/payments.actions";
import * as fromPayment from "../state/payments.reducer";

@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.css']
})
export class AddEditPaymentComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  private subscription : Subscription[]=[];


  constructor(
    private store : Store<fromPayment.AppState>,
    private fb: FormBuilder,
    private location: Location,
    
    
  ) { }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  goBack(): void {
    this.location.back();
  }

  createPayment(){
    this.store.dispatch(new paymentActions.CreatePayment(this.paymentForm.value));
    this.paymentForm.reset();

  }

  save(){

    if (this.paymentForm.invalid) {
      this.validateAllFormFields(this.paymentForm);
    }
    else {
      this.createPayment();
  }
}

  private buildForm() {
    this.paymentForm = this.fb.group({
      "id" : [null],
      'creditCardNumber': [null, [Validators.required, Validators.minLength(12), CreditCardValidators.validateCCNumber]],
      'cardHolder': [null, Validators.required],
      'expirationDate': [null, [Validators.required, CreditCardValidators.validateExpDate]],
      'securityCode': [null, [Validators.minLength(3), Validators.maxLength(4)]],
      'amount': [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(){
    this.subscription.forEach(sub=>{sub.unsubscribe()});
  }

}
