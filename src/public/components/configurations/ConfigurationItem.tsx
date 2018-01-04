import * as React from "react";
import { Configuration } from "./../../../shared/models/configuration/Configuration";
import { ConfigElementType } from "../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";
import { Textbox } from "./../common/form-elements/Textbox"

export interface IOwnProps {
  id: string;
}

export interface IConnectedState {
  configuration: Configuration;
}

export interface IConnectedDispatch {
  update: (
    id: string,
    propertyName: string,
    newValue: any,
    oldValue: any
  ) => void;
  deleteConfig: () => void;
}

export class ConfigurationItem extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  updateClickHandler = (event: any) => {
    const { configuration, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = configuration[name];
    update(configuration._id, name, value, oldValue);
  };

  render() {
    const { configuration, update } = this.props;
    const editUrl = "./configuration/" + configuration._id;

    return (
      <div>
        <div className="row">
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
        </div>
        <div className="row">
          <div className="col-xs">
            <label>Description:</label>
          </div>
          <div className="col-xs">
            <textarea
              className="form-control"
              placeholder="Description"
              aria-label="Description"
              name="description"
              value={configuration.description}
              onChange={this.updateClickHandler}
              
            />
          </div>
          <div className="col-xs">
            <Link to={editUrl}>
              <button type="button" className="btn btn-primary">
                Edit
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
