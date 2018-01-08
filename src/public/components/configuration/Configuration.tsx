import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Textbox } from "./../common/form-elements/Textbox"
import { ConfigurationRecord } from "./../../../shared/models/configuration/Configuration";

interface IRouteParams {
  configId: string;
}
export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export interface IConnectedState {
  configuration: ConfigurationRecord;
  areConfigElementsLoaded: boolean;
}

export interface IConnectedDispatch {
  fetchConfigElements: (id: string) => void;
  update: (
    id: string,
    propertyName: string,
    newValue: any,
    oldValue: any
  ) => void;
}

export class Configuration extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {
  componentDidMount() {
    const { areConfigElementsLoaded, fetchConfigElements } = this.props;
    if (!areConfigElementsLoaded) {
      fetchConfigElements(this.props.match.params.configId);
    }
  }

  updateClickHandler = (event: any) => {
    const { configuration, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = configuration[name];
    update(configuration._id, name, value, oldValue);
  };

  render() {
    const { configuration } = this.props;
    const editFieldUrl = `/configuration/${configuration._id}/field`;

    return (
      <div>
        <h2>
          Configuration: {configuration.name}
        </h2>

        <Textbox
            id={'ConfigurationName_' + configuration._id}
            name="name"
            type="text"
            required={true}
            placeholder="Configuration Name"
            label="Name: "
            value={configuration.name}
            onChange={this.updateClickHandler} 
            labelColSm={3}
            controlColSm={9}/>

        <Link to={editFieldUrl}>
          <button type="button" className="btn btn-primary">
            Manage Fields
            </button>
        </Link>
      </div>
    );
  }
}