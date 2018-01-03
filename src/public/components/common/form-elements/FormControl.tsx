import * as React from "react";
import * as ReactDOM from "react-dom";

export interface FormControlProps {
  labelCol?: number;
  controlCol?: number;
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
  children: JSX.Element;
}

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
