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

  onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  componentDidMount() {
    let unmanagedTooltip = (
      <a href="" onClick={this.onClick} className="text-info">
        <i className="fas fa-info" aria-hidden="true" />
      </a>
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
