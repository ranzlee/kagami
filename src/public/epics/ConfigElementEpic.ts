import { ActionTypeKeys } from './../actions/ActionTypeKeys';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
    FetchConfigElementsAction,
    fetchConfigElementsSuccess,
    fetchConfigElementsError,
    AddConfigElementAction,
    addConfigElementSuccess,
} from './../actions/ConfigElementActions';
import { Observable } from 'rxjs/Observable';
import { IConfigElement } from '../../shared/models/configuration/elements/IConfigElement';
import { elementAt } from 'rxjs/operators/elementAt';

export const fetchConfigElementsEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.FETCH_CONFIG_ELEMENTS)
        .mergeMap((action: FetchConfigElementsAction) =>
            ajax.getJSON(`./api/config/${action.configId}/configElement`)
                .map(response => fetchConfigElementsSuccess(response as IConfigElement[], action.configId))
                .takeUntil(action$.ofType(ActionTypeKeys.CANCEL_QUERY))
                .catch(error => Observable.of(fetchConfigElementsError(error.xhr.response)))
        );

export const addConfigElementEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.ADD_CONFIG_ELEMENT)
        .mergeMap((action: AddConfigElementAction) =>
            ajax.put(`./api/config/${action.configId}/configElement/${action.configElementType}`)
                .map(response => {
                    const {configId, elementId , configElementType } = response.xhr.response;
                    return addConfigElementSuccess(configId, elementId, configElementType);
                })
                //TODO: Add catch 
        );

