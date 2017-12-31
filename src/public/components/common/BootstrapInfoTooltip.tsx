import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

export interface BootstrapInfoTooltipState {
  tooltipElement: Node;
}

export interface BootstrapInfoTooltipProps {
  title: string;
}

export class BootstrapInfoTooltip extends React.Component<
  BootstrapInfoTooltipProps,
  BootstrapInfoTooltipState
> {
  constructor(props: BootstrapInfoTooltipProps) {
    super(props);
    this.state = { tooltipElement: null };
  }

  onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  componentDidMount() {
    let unmanagedTooltip = (
      <button
        onClick={this.onClick}
        className="btn btn-info btn-icon btn-sm btn-icon-mini"
      >
        <i className="fas fa-info" aria-hidden="true" />
      </button>
    );
    let thisElement = ReactDOM.findDOMNode(this);
    ReactDOM.render(unmanagedTooltip, thisElement, () => {
      let tooltipElement = thisElement.firstChild;
      this.setState({ tooltipElement: tooltipElement });
      let options = {
        container: "body",
        delay: 300,
        placement: "auto",
        title: this.props.title
      };
      ($(tooltipElement) as any).tooltip(options);
    });
  }

  componentWillUnmount() {
    ($(this.state.tooltipElement) as any).tooltip("dispose");
  }

  render() {
    return <div />;
  }
}
