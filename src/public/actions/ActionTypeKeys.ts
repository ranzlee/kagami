export enum ActionTypeKeys {

    FETCH_CONFIGS = "FETCH_CONFIGS",
    FETCH_CONFIGS_SUCCESS = "FETCH_CONFIGS_SUCCESS",
    FETCH_CONFIGS_ERROR = "FETCH_CONFIGS_ERROR",

    FETCH_CONFIG_ELEMENTS = "FETCH_CONFIG_ELEMENTS",
    FETCH_CONFIG_ELEMENTS_SUCCESS = "FETCH_CONFIG_ELEMENTS_SUCCESS",
    FETCH_CONFIG_ELEMENTS_ERROR = "FETCH_CONFIG_ELEMENTS_ERROR",

    ADD_CONFIGURATION = "ADD_CONFIGURATION",
    ADD_CONFIGURATION_SUCCESS = "ADD_CONFIGURATION_SUCCESS",
    ADD_CONFIGURATION_ERROR = "ADD_CONFIGURATION_ERROR",

    DELETE_CONFIGURATION = "DELETE_CONFIGURATION",
    UPDATE_CONFIGURATION = "UPDATE_CONFIGURATION",

    ADD_CONFIG_ELEMENT = "ADD_CONFIG_ELEMENT",
    ADD_CONFIG_ELEMENT_SUCCESS = "ADD_CONFIG_ELEMENT_SUCCESS",
    ADD_CONFIG_ELELEMT_ERROR = "ADD_CONFIG_ELEMENT_ERROR",

    ADD_FIELD_ADDRESS = "ADD_FIELD_ADDRESS",
    UPDATE_FIELD_ADDRESS = "UPDATE_FIELD_ADDRESS",

    UPDATE_CONFIG_ELEMENT = "UPDATE_CONFIG_ELEMENT",
    DELETE_CONFIG_ELEMENT = "DELETE_ENTITY",

    AJAX_SUCCESS = "AJAX_SUCCESS",
    CANCEL_QUERY = "CANCEL_QUERY",

    CREATE_NOTIFICATION = "CREATE_NOTIFICATION",
    REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",

    OTHER_ACTION = "__any_other_action_type__"
}