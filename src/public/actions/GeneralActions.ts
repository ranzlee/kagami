import { ActionTypeKeys } from "./../actions/ActionTypeKeys";

export type GeneralActionTypes =
    | CancelQueryAction
    | AjaxSuccessAction;

export interface CancelQueryAction {
    type: ActionTypeKeys.CANCEL_QUERY
}
export interface AjaxSuccessAction {
    type: ActionTypeKeys.AJAX_SUCCESS
}
export const cancelQuery = (): CancelQueryAction => ({
    type: ActionTypeKeys.CANCEL_QUERY
});
export const ajaxSuccess = (): AjaxSuccessAction => ({
    type: ActionTypeKeys.AJAX_SUCCESS
});