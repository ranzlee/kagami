import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

export interface BootstrapFadeAlertState {
  alertClassNames: string;
}

export interface BootstrapFadeAlertProps {
  alertClassName:
    | "alert-primary"
    | "alert-secondary"
    | "alert-success"
    | "alert-danger"
    | "alert-warning"
    | "alert-info"
    | "alert-light"
    | "alert-dark";
  alertTitle: string;
  alertBody: string;
  onClose: () => void;
}

export class BootstrapFadeAlert extends React.Component<
  BootstrapFadeAlertProps,
  BootstrapFadeAlertState
> {
  constructor(props: BootstrapFadeAlertProps) {
    super(props);
    this.state = {
      alertClassNames:
        this.props.alertClassName + " alert alert-dismissible fade show"
    };
  }

  componentDidMount() {
    let unmanagedAlert = (
      <div className={this.state.alertClassNames} role="alert">
        <div className="row">
          <div className="col-lg-9">
            <span className="alert-heading text-lg">
              {this.props.alertTitle}
            </span>
          </div>
          <div className="col-lg-3">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-info btn-sm btn-icon btn-icon-mini"
                data-dismiss="alert"
                aria-label="Close"
              >
                <i className="fa fa-times" />
              </button>
            </div>
          </div>
        </div>
        <hr />
        <p>{this.props.alertBody}</p>
      </div>
    );
    let thisElement = ReactDOM.findDOMNode(this);
    ReactDOM.render(unmanagedAlert, thisElement, () => {
      let alertElement = thisElement.firstChild;
      $(alertElement).on("closed.bs.alert", () => {
        this.props.onClose();
      });
    });
  }

  render() {
    return <div />;
  }
}
