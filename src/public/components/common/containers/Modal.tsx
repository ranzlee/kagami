import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import * as lodash from "lodash";

export interface ModalState {}

export interface ModalProps {
  id?: string;
  width?: string;
}

export class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {};
  }

  instance: HTMLDivElement;

  showModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.instance != null) {
      ($(this.instance) as any).modal();
    }
  };

  render() {
    let modalStyle = {
      minWidth: this.props.width != null ? this.props.width : "0px"
    };

    let id = lodash.uniqueId(this.props.id);
    return (
      <>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.showModal}
        >
          Launch demo modal
        </button>
        <div
          ref={instance => {
            this.instance = instance;
          }}
          className="modal fade"
          id={id}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog"
            style={this.props.width != null ? modalStyle : null}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Modal title
                </h4>
              </div>
              <div className="modal-body">{this.props.children}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default btn-simple"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-info btn-simple">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
