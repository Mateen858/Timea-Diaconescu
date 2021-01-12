import { PaymentsModel } from './../../shared/models/payments-model';
import * as PaymentActions from"./payments.actions";
import * as fromRoot from "../../state/app-sate";
import {EntityAdapter, EntityState, createEntityAdapter} from "@ngrx/entity"
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface PaymentsState extends EntityState<PaymentsModel> {

    selectedPaymentId: number | null,
    loading:boolean,
    loaded:boolean,
    error:string
}

export interface AppState extends fromRoot.AppState{
    payments:PaymentsState;
}

export const paymentAdapter:EntityAdapter<PaymentsModel> = createEntityAdapter<PaymentsModel>();
const defaultPayment: PaymentsState = {
    ids:[],
    entities:{},
    selectedPaymentId:null,
    loaded:false,
    loading:false,
    error:""
}

export const initialState= paymentAdapter.getInitialState(defaultPayment);

export function PaymentReducer(state = initialState, action:PaymentActions.actions):PaymentsState{
    switch(action.type){
        // case PaymentActions.PaymentActionTypes.LOAD_PAYMENTS:{
        //     return {
        //         ...state,
        //         loading:true,
        //         loaded:false
        //     }
        // }

        case PaymentActions.PaymentActionTypes.LOAD_PAYMENTS_SUCCESS:{
            return paymentAdapter.setAll(action.payload,{
                ...state,
                loading:false,
                loaded:true
            })
        }

        case PaymentActions.PaymentActionTypes.LOAD_PAYMENTS_FAILURE:{
            return {
                ...state,
               entities:{},
                loading:false,
                loaded:true,
                error:action.payload
            }
        }


        // case PaymentActions.PaymentActionTypes.LOAD_PAYMENT:{
        //     return {
        //         ...state,
        //         loading:true,
        //         loaded:false
        //     }
        // }

        case PaymentActions.PaymentActionTypes.LOAD_PAYMENT_SUCCESS:{
            return paymentAdapter.addOne(action.payload,{
                ...state,
                selectedPaymentId:action.payload.id,
            })
        }

        case PaymentActions.PaymentActionTypes.LOAD_PAYMENT_FAILURE:{
            return {
                ...state,
                error:action.payload
            }
        }

        case PaymentActions.PaymentActionTypes.CREATE_PAYMENT_SUCCESS:{
            return paymentAdapter.addOne(action.payload,state);
        }

        case PaymentActions.PaymentActionTypes.CREATE_PAYMENT_FAILURE:{
            return {
                ...state,
                error:action.payload
            }
        }

        case PaymentActions.PaymentActionTypes.UPDATE_PAYMENT_SUCCESS:{
            return paymentAdapter.updateOne(action.payload,state);
        }

        case PaymentActions.PaymentActionTypes.UPDATE_PAYMENT_FAILURE:{
            return {
                ...state,
                error:action.payload
            }
        }

        case PaymentActions.PaymentActionTypes.DELETE_PAYMENT_SUCCESS:{
            return paymentAdapter.removeOne(action.payload,state);
        }

        case PaymentActions.PaymentActionTypes.DELETE_PAYMENT_FAILURE:{
            return {
                ...state,
                error:action.payload
            }
        }

        

        default:{
            return state;
        }

    }
}


const getPaymentFeatureState = createFeatureSelector<PaymentsState>(
    "payments"
)

export const getPayments = createSelector(
    getPaymentFeatureState,
    paymentAdapter.getSelectors().selectAll
);

export const getPaymentsLoading = createSelector(
    getPaymentFeatureState,
    (state: PaymentsState) => state.loading
);

export const getPaymentsLoaded = createSelector(
    getPaymentFeatureState,
    (state: PaymentsState) => state.loaded
);

export const getPaymentsError = createSelector(
    getPaymentFeatureState,
    (state: PaymentsState) => state.error
);

export const getCurrentPaymentId = createSelector(
    getPaymentFeatureState,
    (state:PaymentsState)=>state.selectedPaymentId
);

export const getCurrentPayment = createSelector(
    getPaymentFeatureState,
    getCurrentPaymentId,
    state=>state.entities[state.selectedPaymentId]
)



// const initialState = {
//     payments : [
//         {
//             "id":1,
//             "creditCardNumber":"1111 1111 1111 1111",
//             "cardHolder":"R Mateen",
//             "expirationDate":"10-1-2020 12:00PM",
//             "securityCode":"123",
//             "amount":100
//          },
//          {
//              "id":2,
//              "creditCardNumber":"1111 1111 1111 1111",
//              "cardHolder":"R Mateen",
//              "expirationDate":"10-1-2020 12:00PM",
//              "securityCode":"123",
//              "amount":100
//           },
//           {
//              "id":3,
//              "creditCardNumber":"1111 1111 1111 1111",
//              "cardHolder":"R Mateen",
//              "expirationDate":"10-1-2020 12:00PM",
//              "securityCode":"123",
//              "amount":100
//           },
//     ],
//     isLoading : false,
//     isLoaded : true
// }

// export function paymentsReducer(state = initialState, action){
//     switch(action.type){
//         case "LOAD_PAYMENTS":{
//             return {
//                 ...state,
//                 isLoading:true,
//                 isLoaded:false
//             };
//         }

//         default:{
//             return state;
//         }
//     }
// }


