import { PaymentsModel } from './../models/payments-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiAddress : string = environment.apiAddress;
  private paymentsAddress : string = this.apiAddress + "payments/"
  

constructor(private httpClient: HttpClient) { }

payments(): Observable<PaymentsModel[]> {
  console.log("service called");
  return this.httpClient.get<PaymentsModel[]>(this.paymentsAddress);
}

payment(paymentId: number): Observable<PaymentsModel> {
  return this.httpClient.get<PaymentsModel>(`${this.paymentsAddress + paymentId}`);
}

create(payment: PaymentsModel): Observable<PaymentsModel> {
  return this.httpClient.post<PaymentsModel>(this.paymentsAddress, payment);
}

update(paymentId: number, payment: PaymentsModel): Observable<any> {
  return this.httpClient.put(`${this.paymentsAddress + paymentId}`, payment, { observe: 'response' });
}

delete(paymentId: number): Observable<any> {
  return this.httpClient.delete(`${this.paymentsAddress + paymentId}`, { observe: 'response' });
}

}
