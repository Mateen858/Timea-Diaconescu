import { ListPaymentComponent } from './list-payment/list-payment.component';
import { AddEditPaymentComponent } from './add-edit-payment/add-edit-payment.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'add', component: AddEditPaymentComponent,data :{title: 'Add Payment'}},
      {path:'edit/:id', component: AddEditPaymentComponent, data :{title: 'Edit Payment'}},
      {path:'', component: ListPaymentComponent, data :{title: 'Payments List'}},
];

export const PaymentsRoutes = RouterModule.forChild(routes);
