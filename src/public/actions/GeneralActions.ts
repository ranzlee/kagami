import { ActionTypeKeys } from "./../actions/ActionTypeKeys";

export type GeneralActionTypes =
    | AjaxSuccessAction;

    
export interface AjaxSuccessAction {
    type: ActionTypeKeys.AJAX_SUCCESS
}
export const ajaxSuccess = () : AjaxSuccessAction => ({
    type: ActionTypeKeys.AJAX_SUCCESS
});