import { AddEditPaymentComponent } from './add-edit-payment/add-edit-payment.component';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { PaymentsRoutes } from './payments.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PaymentReducer } from "./state/payments.reducer"
import { EffectsModule } from '@ngrx/effects';
import { PaymentEffect } from './state/payment.effects';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CreditCardDirectivesModule } from 'angular-cc-library';



@NgModule({
  imports: [
    PaymentsRoutes,
    CommonModule,
    StoreModule.forFeature("payments", PaymentReducer),
    EffectsModule.forFeature([PaymentEffect]),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    CreditCardDirectivesModule
  ],
  declarations: [ListPaymentComponent, AddEditPaymentComponent],
  providers:[ToastrService]
})
export class PaymentsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
 }
