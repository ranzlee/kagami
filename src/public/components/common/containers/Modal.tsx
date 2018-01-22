import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import * as lodash from "lodash";
import { Form } from "../form-elements/Form";

export interface ModalState {}

export interface ModalProps {
  id?: string;
  size?: "sm" | "md" | "lg";
  width?: string;
  buttonAlignment?: "left" | "right";
  buttonTitle: string;
  modalTitle: string;
  showFooter?: boolean;
  showFooterCancelButton?: boolean;
  footerCancelButtonLabel?: string;
  onCancelButtonClick?: () => void;
  showFooterOkButton?: boolean;
  footerOkButtonLabel?: string;
  onOkButtonClick?: () => void;
}

export class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    if (this.instance != null) {
      ($(this.instance) as any).modal("dispose");
    }
  }

  instance: HTMLDivElement;

  showModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.instance != null) {
      ($(this.instance) as any).modal();
    }
  };

  hideModal = () => {
    if (this.instance != null) {
      ($(this.instance) as any).modal("hide");
      if (this.props.onCancelButtonClick) {
        this.props.onCancelButtonClick();
      }
    }
  };

  onOkDismiss = () => {
    if (this.instance != null) {
      ($(this.instance) as any).modal("hide");
      if (this.props.onOkButtonClick) {
        this.props.onOkButtonClick();
      }
    }
  };

  recursiveMap(
    children: React.ReactNode,
    fn: (child: React.ReactNode, thisComponent: Modal) => React.ReactNode,
    thisComponent: Modal
  ): React.ReactNode {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      if ((child as any).props.children) {
        child = React.cloneElement(child as any, {
          children: this.recursiveMap(
            (child as any).props.children,
            fn,
            thisComponent
          )
        });
      }
      return fn(child, thisComponent);
    });
  }

  mapChild(child: React.ReactNode, thisComponent: Modal): React.ReactNode {
    if (
      !(child as any).type ||
      !(child as any).type.prototype ||
      !((child as any).type.prototype instanceof React.Component)
    ) {
      return child;
    }
    return React.cloneElement(child as any, { modal: thisComponent });
  }

  render() {
    let modalStyle = {
      minWidth: this.props.width != null ? this.props.width : "0px"
    };
    let id = lodash.uniqueId(this.props.id);
    let modalLabelId = lodash.uniqueId();
    let alignmentClass =
      this.props.buttonAlignment === "right" ? "float-right" : "float-left";
    let modalClasses = "modal-dialog ";
    modalClasses +=
      this.props.width != null
        ? ""
        : this.props.size && this.props.size === "sm"
          ? "modal-sm"
          : this.props.size && this.props.size === "lg" ? "modal-lg" : "";
    let footerCancelButton = (
      <button
        type="button"
        className="btn btn-default btn-simple"
        onClick={this.hideModal}
      >
        {this.props.footerCancelButtonLabel != null
          ? this.props.footerCancelButtonLabel
          : "Cancel"}
      </button>
    );
    let footerOkButton = (
      <button
        type="button"
        className="btn btn-primary btn-simple"
        onClick={this.onOkDismiss}
      >
        {this.props.footerOkButtonLabel != null
          ? this.props.footerOkButtonLabel
          : "OK"}
      </button>
    );
    let footer = this.props.showFooter ? (
      <div className="modal-footer">
        {footerCancelButton}
        {footerOkButton}
      </div>
    ) : (
      ""
    );
    return (
      <>
        <div className={alignmentClass}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.showModal}
          >
            {this.props.buttonTitle}
          </button>
        </div>
        <div className="clearfix" />
        <div
          ref={instance => {
            this.instance = instance;
          }}
          className="modal fade"
          id={id}
          tabIndex={-1}
          role="dialog"
          aria-labelledby={modalLabelId}
          aria-hidden="true"
        >
          <div
            className={modalClasses}
            style={this.props.width != null ? modalStyle : null}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  aria-hidden="true"
                  onClick={this.hideModal}
                >
                  &times;
                </button>
                <h4 className="modal-title" id={modalLabelId}>
                  {this.props.modalTitle}
                </h4>
              </div>
              <div className="modal-body">
                <hr className="bg-primary" />
                {this.recursiveMap(this.props.children, this.mapChild, this)}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </>
    );
  }
}
