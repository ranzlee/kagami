import { IConfigLookup } from './../types/AppStore';
import { Configuration } from './../../shared/models/configuration/Configuration';
import {
    AddConfigurationAction,
    UpdateConfigurationAction,
    ConfigurationActionTypes,
    addConfigSuccess,
    addConfigError,
    FetchConfigsAction,
    fetchConfigsSuccess,
    fetchConfigsError
} from './../actions/ConfigurationActions';
import { ajaxSuccess } from './../actions/GeneralActions';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypeKeys } from './../actions/ActionTypeKeys';
import { Observable } from 'rxjs/Observable';
import { Epic, ofType } from 'redux-observable';


export const fetchConfigurationsEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.FETCH_CONFIGS)
        .mergeMap((action: FetchConfigsAction) =>
            ajax.getJSON(`./api/config`)
                .map((configs: Configuration[]) => {
                    const configLookup = configs.reduce(
                        (dict: IConfigLookup, item: Configuration, index) => {
                            dict[item._id] = item;
                            return dict;
                        }, {});
                    return fetchConfigsSuccess(configLookup as IConfigLookup)
                })
                .takeUntil(action$.ofType(ActionTypeKeys.CANCEL_QUERY))
                .catch(error => Observable.of(fetchConfigsError(error.xhr.response)))
        );

export const addConfigurationEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.ADD_CONFIGURATION)
        .mergeMap((action: AddConfigurationAction) =>
            ajax.put(`./api/config`)
                .map(response => addConfigSuccess(response.xhr.response._id as string))
                .catch(error => Observable.of(addConfigError(error.xhr.response)))
        );


export const updateConfigurationEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.UPDATE_CONFIGURATION)
        .groupBy((action: UpdateConfigurationAction) => {
            return action.propertyName;
        })
        .map((group) => {
            console.log("In merge map")
            var item = group.debounceTime(2000).toArray();
            return item;
        })
        .mergeMap(item => {
            console.log("ITEM: ")
            console.log(item);
            return item;
        })
        //.debounceTime(2000)
        //.distinctUntilChanged()
        .mergeMap((action: UpdateConfigurationAction) => {
            console.log("In 2nd merge map")
            console.log(action);
            console.log("made it here: "+ action.newValue);
            return ajax.post(`./api/config/${action.configId}`,
                {
                    propertyName: action.propertyName,
                    newValue: action.newValue
                })
                .map(ajaxSuccess)
        });