var expect = require('expect');
import Mock = jest.Mock;
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { updateConfigurationEpic } from "./ConfigurationEpic";
import { updateConfig, UpdateConfigurationAction } from '../actions/ConfigurationActions';
import { ActionTypeKeys } from '../actions/ActionTypeKeys';
import { AjaxSuccessAction } from '../actions/GeneralActions';
import { Observable } from 'rxjs';

const epicMiddleware = createEpicMiddleware(updateConfigurationEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('Configuration Epic', () => {
  const originalAjaxPost = Observable.ajax.post;

  let store: any;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(updateConfigurationEpic);
    Observable.ajax.post = originalAjaxPost;
  });

  it('updateConfigurationEpic debounce with separate inputs', (done) => {

    Observable.ajax.post = jest.fn(() => Observable.of(null));

    const configId = "13";

    const firstFieldPropertyName = "name";
    const secondFieldPropertyName = "description";

    const firstFieldValue1 = "cody";
    const firstFieldValue2 = "cody raffy";
    const secondFieldValue = "is the man";

    const oldValues = "";

    store.dispatch(updateConfig(configId, firstFieldPropertyName, firstFieldValue1, oldValues));
    store.dispatch(updateConfig(configId, firstFieldPropertyName, firstFieldValue2, oldValues));
    store.dispatch(updateConfig(configId, secondFieldPropertyName, secondFieldValue, oldValues));
    
    // Now this event should not cause an ajax call because the value has not changed from the previous value
    setTimeout(() => {
      store.dispatch(updateConfig(configId, secondFieldPropertyName, secondFieldValue, oldValues));
    }, 2100);




    setTimeout(() => {
      const calls = (Observable.ajax.post as Mock<any>).mock.calls;
      expect(Array.isArray(calls)).toBeTruthy();
      console.log("Calls: " + calls.length);
      expect(calls.length).toEqual(2);

      const action1: UpdateConfigurationAction = {
        type: ActionTypeKeys.UPDATE_CONFIGURATION,
        configId,
        propertyName: firstFieldPropertyName,
        newValue: firstFieldValue1,
        oldValue: oldValues
      };

      const action2: UpdateConfigurationAction = {
        type: ActionTypeKeys.UPDATE_CONFIGURATION,
        configId,
        propertyName: firstFieldPropertyName,
        newValue: firstFieldValue2,
        oldValue: oldValues
      };

      const action3: UpdateConfigurationAction = {
        type: ActionTypeKeys.UPDATE_CONFIGURATION,
        configId: configId,
        propertyName: secondFieldPropertyName,
        newValue: secondFieldValue,
        oldValue: oldValues
      };

      const action4: AjaxSuccessAction = {
        type: ActionTypeKeys.AJAX_SUCCESS
      };

      expect(store.getActions()).toEqual([
        action1,
        action2,
        action3,
        action3,
        action4,
        action4
      ]);

      done();
    }, 5000);
    console.log("=============1313=================");
  });
});