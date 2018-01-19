import { ActionTypeKeys } from './../actions/ActionTypeKeys';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
    UpdateFieldAddress, AddFieldAddress,
} from './../actions/ConfigElementActions';
import { ajaxSuccess } from '../actions/GeneralActions';


export const addFieldAddressEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.ADD_FIELD_ADDRESS)
        .mergeMap((action: AddFieldAddress) =>
            ajax.put(`./api/field/${action.fieldId}/address`)
                .map(ajaxSuccess)
        //TODO: Add catch 
        );

export const updateFieldAddressEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.UPDATE_FIELD_ADDRESS)
        .groupBy((action: UpdateFieldAddress) => action.fieldId + action.propertyName)
        .mergeMap((group: any) => group
            .distinctUntilChanged(
            (action1: UpdateFieldAddress, action2: UpdateFieldAddress) => {
                return action1.newValue === action2.newValue;
            }
            )
            .debounceTime(2000))
        .mergeMap((action: UpdateFieldAddress) => {
            return ajax.post(`./api/field/${action.fieldId}/address`,
                {
                    addressIndex: action.addressIndex,
                    propertyName: action.propertyName,
                    newValue: action.newValue
                })
                .map(ajaxSuccess)
        });