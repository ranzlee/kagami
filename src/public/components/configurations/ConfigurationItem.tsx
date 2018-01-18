import * as React from "react";
import { Configuration } from "./../../../shared/models/configuration/Configuration";
import { ConfigElementType } from "../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";
import { Textbox } from "./../common/form-elements/Textbox"
import { TextArea } from "../common/form-elements/TextArea";

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
          <div className="col-lg-6 col-sm-12">
            <Textbox
              id={'Configuration_Name_' + configuration._id}
              name="name"
              type="text"
              required={true}
              placeholder="Configuration Name"
              label="Name: "
              value={configuration.name}
              onChange={this.updateClickHandler}
              labelColLg={3}
              controlColLg={9}
              labelColSm={6}
              controlColSm={6}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <TextArea
              id={'Configuration_Description_' + configuration._id}
              name="description"
              label="Description: "
              placeholder="Description"
              value={configuration.description}
              onChange={this.updateClickHandler}
              labelColLg={3}
              controlColLg={9}
              labelColSm={6}
              controlColSm={6}
              rows={5} />
          </div>
          <div className="col-lg-6 col-sm-12">
            <Link to={editUrl}>
              <button type="button" className="btn btn-primary">
                Edit
                </button>
            </Link>
          </div>
        </div >
      </div >
    );
  }
}