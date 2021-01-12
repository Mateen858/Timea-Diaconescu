import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
		path: "payments",
		loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
  },
  {
		path: '',
		redirectTo: `/payments`,
		pathMatch: 'full'
  },
  {
		path: '**',
		redirectTo: `/payments`,
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
