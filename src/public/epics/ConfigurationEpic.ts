import {
    AddConfigurationAction,
    FetchConfigurationAction,
    FetchConfigurationSuccessAction,
    FetchConfigurationErrorAction,
    fetchConfigSuccess,
    fetchConfigError,
    UpdateConfigurationAction,
    ConfigurationActionTypes,
    addConfigSuccess,
    addConfigError,
} from './../actions/ConfigurationActions';
import { ajaxSuccess} from './../actions/GeneralActions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypeKeys } from './../actions/ActionTypeKeys';
import { Observable } from 'rxjs/Observable';
import { IDomain, AppStore } from '../types/AppStore';
import { Epic, ofType } from 'redux-observable';

export const fetchConfigurationEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.FETCH_CONFIGURATION)
        .mergeMap((action: FetchConfigurationAction) =>
            ajax.getJSON(`./api/configuration/${action.id}`)
                .map(response => fetchConfigSuccess(response as IDomain))
                .catch(error => Observable.of(fetchConfigError(error.xhr.response)))
        );

export const addConfigurationEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.ADD_CONFIGURATION)
        .mergeMap((action: AddConfigurationAction) =>
            ajax.put(`./api/configuration`)
                .map(response => addConfigSuccess(response.xhr.response._id as string))
                .catch(error => Observable.of(addConfigError(error.xhr.response)))
            );


export const updateConfigurationEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.UPDATE_CONFIGURATION)
        .debounceTime(2000)
        .distinctUntilChanged()
        .mergeMap((action: UpdateConfigurationAction) =>
            ajax.post(`./api/configuration/${action.configId}`,
                {
                    propertyName: action.propertyName,
                    newValue: action.newValue
                })
                .map(ajaxSuccess));