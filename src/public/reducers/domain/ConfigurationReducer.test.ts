import { ActionTypeKeys } from './../../actions/ActionTypeKeys';
import { configurationReducer } from "./ConfigurationReducer";
import { AddConfigurationSuccessAction } from '../../actions/ConfigurationActions';
import { OtherAction } from '../../actions/GeneralActions';
import { IConfigLookup } from '../../types/AppStore';

describe("Configuration Reducer", () => {
    it("default case", () => {
        const defaultState: IConfigLookup = {};
        const otherAction: OtherAction = { type: ActionTypeKeys.OTHER_ACTION };

        expect(configurationReducer(undefined, otherAction))
            .toEqual(defaultState);
    });
});