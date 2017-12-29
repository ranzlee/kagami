import { ActionTypeKeys } from './../actions/ActionTypeKeys';
import 'rxjs/add/operator/map';
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
} from './../actions/ConfigElementActions';
import { Observable } from 'rxjs/Observable';
import { IConfigurationElement } from '../../shared/models/configuration/elements/IConfigurationElement';

export const fetchConfigElementsEpic = (action$: any) =>
    action$.ofType(ActionTypeKeys.FETCH_CONFIG_ELEMENTS)
        .mergeMap((action: FetchConfigElementsAction) =>
            ajax.getJSON(`./api/config/${action.configId}/configElement`)
                .map(response => fetchConfigElementsSuccess(response as IConfigurationElement[]))
                .catch(error => Observable.of(fetchConfigElementsError(error.xhr.response)))
        );