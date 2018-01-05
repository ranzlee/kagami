import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CustomValidationResult {
  isValid: boolean;
  validationMessage: string;
}

export interface FormControlState {
  invalidFeedback: string;
}

export interface FormControlProps {
  id: string;
  name?: string;
  label: string;
  labelCol?: number;
  controlCol?: number;
  labelColLg?: number;
  controlColLg?: number;
  labelColMd?: number;
  controlColMd?: number;
  labelColSm?: number;
  controlColSm?: number;
  invalidFeedback?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCustomValidation?: (
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ) => CustomValidationResult;
}

export interface FormControlExtendedProperties {
  labelClasses: string;
  formControlClasses: string;
  children: JSX.Element;
}

export let OnChangeCustomValidation = (
  component: React.Component<FormControlProps, FormControlState>,
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
): void => {
  let target = event.currentTarget;
  let validationResult = component.props.onChangeCustomValidation(element);
  element.setCustomValidity("");
  component.setState(
    { invalidFeedback: component.props.invalidFeedback },
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
};

export let FormControlExtendedProperties = (
  props: FormControlProps
): FormControlExtendedProperties => {
  let labelCol = props.labelCol ? "col-" + props.labelCol : null;
  let labelColLg = props.labelColLg ? "col-lg-" + props.labelColLg : null;
  let labelColMd = props.labelColMd ? "col-md-" + props.labelColMd : null;
  let labelColSm = props.labelColSm ? "col-sm-" + props.labelColSm : null;
  let controlCol = props.controlCol ? "col-" + props.controlCol : null;
  let controlColLg = props.controlColLg ? "col-lg-" + props.controlColLg : null;
  let controlColMd = props.controlColMd ? "col-md-" + props.controlColMd : null;
  let controlColSm = props.controlColSm ? "col-sm-" + props.controlColSm : null;
  let children = null;
  if ((props as any).children) {
    children = <div className="col">{(props as any).children}</div>;
  }
  if (
    labelCol == null &&
    labelColLg == null &&
    labelColMd == null &&
    labelColSm == null
  ) {
    labelCol = "col";
  }
  if (
    controlCol == null &&
    controlColLg == null &&
    controlColMd == null &&
    controlColSm == null
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
      controlCol + " " + controlColLg + " " + controlColMd + " " + controlColSm,
    children: children
  };
};
