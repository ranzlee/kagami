import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

export interface FadeAlertState {
  alertClassNames: string;
}

export interface FadeAlertProps {
  className:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  title: string;
  body: string;
  onClose: () => void;
}

export class FadeAlert extends React.Component<FadeAlertProps, FadeAlertState> {
  constructor(props: FadeAlertProps) {
    super(props);
    this.state = {
      alertClassNames: "alert-" + this.props.className + " alert fade show"
    };
  }

  componentDidMount() {
    let buttonClasses =
      "btn-" + this.props.className + " btn btn-icon btn-sm btn-icon-mini";
    let unmanagedAlert = (
      <div className={this.state.alertClassNames} role="alert">
        <div className="container">
          <span className="h6">{this.props.title}</span>
          <span className="float-right">
            &nbsp;
            <button
              type="button"
              className={buttonClasses}
              data-dismiss="alert"
              aria-label="Close"
            >
              <i className="fa fa-times" />
            </button>
          </span>
          <div className="clearfix" />
          <p>{this.props.body}</p>
        </div>
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
