import * as React from "react";
import * as ReactDOM from "react-dom";

export interface FormControlProps {
  labelColLg?: number;
  controlColLg?: number;
  labelColMd?: number;
  controlColMd?: number;
  labelColSm?: number;
  controlColSm?: number;
}

export interface FormControlExtendedProperties {
  labelClasses: string;
  formControlClasses: string;
}

export let FormControlExtendedProperties = (
  props: FormControlProps
): FormControlExtendedProperties => {
  let labelColLg = props.labelColLg
    ? " col-lg-" + props.labelColLg + " "
    : null;
  let labelColMd = props.labelColMd
    ? " col-md-" + props.labelColMd + " "
    : null;
  let labelColSm = props.labelColSm
    ? " col-sm-" + props.labelColSm + " "
    : null;
  let controlColLg = props.controlColLg
    ? " col-lg-" + props.controlColLg + " "
    : null;
  let controlColMd = props.controlColMd
    ? " col-md-" + props.controlColMd + " "
    : null;
  let controlColSm = props.controlColSm
    ? " col-sm-" + props.controlColSm + " "
    : null;
  if (labelColLg == null && labelColMd == null && labelColSm == null) {
    labelColLg = " col ";
  }
  if (controlColLg == null && controlColMd == null && controlColSm == null) {
    controlColLg = " col ";
  }
  return {
    labelClasses: "col-form-label" + labelColLg + labelColMd + labelColSm,
    formControlClasses: controlColLg + controlColMd + controlColSm
  };
};
