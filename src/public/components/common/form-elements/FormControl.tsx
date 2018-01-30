import * as React from "react";
import * as ReactDOM from "react-dom";
import { Form } from "./Form";
import * as Moment from "moment";

export interface CustomValidationResult {
  isValid: boolean;
  validationMessage: string;
}

export interface FormControlState {
  invalidFeedback: string;
}

export interface FormControlProps {
  id?: string;
  name?: string;
  label: string;
  readOnly?: boolean;
  disabled?: boolean;
  labelCol?: number;
  controlCol?: number;
  labelColLg?: number;
  controlColLg?: number;
  labelColMd?: number;
  controlColMd?: number;
  labelColSm?: number;
  controlColSm?: number;
  invalidFeedback?: string;
  onChange?: (
    eventOrMomentOrAny:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
      | Moment.Moment
      | any
  ) => void;
  onChangeCustomValidation?: (
    elementOrMomentOrAny:
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | Moment.Moment
      | any
  ) => CustomValidationResult;
  doCustomValidationOnMount?: boolean;
  form?: Form;
}

export interface FormControlExtendedProperties {
  labelClasses: string;
  formControlClasses: string;
}

export let OnChangeCustomValidation = (
  component: React.Component<FormControlProps, FormControlState>,
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  data?: any
): CustomValidationResult => {
  //if component doesn't have a handler for custom validation, return valid
  if (!component.props.onChangeCustomValidation) {
    return { isValid: true, validationMessage: "" };
  }
  //if component is read-only, return valid - this is to match the HTML 5 constraint validation specification in that
  //constraint validation is ignored for readonly form elements
  if (component.props.readOnly != null) {
    if (component.props.readOnly) {
      return { isValid: true, validationMessage: "" };
    }
  } else if (
    component.props.form &&
    component.props.form.props.readOnly != null
  ) {
    if (component.props.form.props.readOnly) {
      return { isValid: true, validationMessage: "" };
    }
  }
  //if component is disabled, return valid - this is to match the HTML 5 constraint validation specification in that
  //constraint validation is ignored for disabled form elements
  if (component.props.disabled != null) {
    if (component.props.disabled) {
      return { isValid: true, validationMessage: "" };
    }
  } else if (
    component.props.form &&
    component.props.form.props.disabled != null
  ) {
    if (component.props.form.props.disabled) {
      return { isValid: true, validationMessage: "" };
    }
  }
  //call custom validation delegate
  let validationResult = component.props.onChangeCustomValidation(
    data !== undefined ? data : element
  );
  element.setCustomValidity("");
  component.setState(
    {
      invalidFeedback: component.props.invalidFeedback
    },
    () => {
      if (!element.validity.valid) {
        return;
      }
      if (!validationResult.isValid) {
        element.setCustomValidity(validationResult.validationMessage);
        component.setState({
          invalidFeedback: validationResult.validationMessage
        });
      }
    }
  );
  return validationResult;
};

export let FormControlExtendedProperties = (
  props: FormControlProps
): FormControlExtendedProperties => {
  let labelCol = props.labelCol ? "col-" + props.labelCol : "";
  let labelColLg = props.labelColLg ? "col-lg-" + props.labelColLg : "";
  let labelColMd = props.labelColMd ? "col-md-" + props.labelColMd : "";
  let labelColSm = props.labelColSm ? "col-sm-" + props.labelColSm : "";
  let controlCol = props.controlCol ? "col-" + props.controlCol : "";
  let controlColLg = props.controlColLg ? "col-lg-" + props.controlColLg : "";
  let controlColMd = props.controlColMd ? "col-md-" + props.controlColMd : "";
  let controlColSm = props.controlColSm ? "col-sm-" + props.controlColSm : "";
  if (
    labelCol == "" &&
    labelColLg == "" &&
    labelColMd == "" &&
    labelColSm == ""
  ) {
    labelCol = "col";
  }
  if (
    controlCol == "" &&
    controlColLg == "" &&
    controlColMd == "" &&
    controlColSm == ""
  ) {
    controlCol = "col";
  }
  return {
    labelClasses:
      "col-form-label " +
      labelCol +
      " " +
      labelColLg +
      " " +
      labelColMd +
      " " +
      labelColSm,
    formControlClasses:
      controlCol + " " + controlColLg + " " + controlColMd + " " + controlColSm
  };
};
