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
        <h5 className="alert-heading">{this.props.alertTitle}</h5>
        <hr />
        <p>{this.props.alertBody}</p>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
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
