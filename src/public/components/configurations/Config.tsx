import * as React from "react";
import { Row, Col, ControlLabel, FormGroup, FormControl } from "react-bootstrap";
import { Configuration } from "./../../../shared/models/configuration/Configuration"
import { ConfigElementType } from "../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";

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
        oldValue: any) => void;
    deleteConfig: () => void;
}

export class Config extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {
    updateClickHandler = (event: any) => {
        const { configuration, update } = this.props;

        const target = event.target;
        const value = target.value;
        const name = target.name;

        const oldValue = configuration[name];
        update(configuration.id, name, value, oldValue);
    }

    render() {
        const { configuration, update } = this.props;
        const editUrl = "./configuration/" + configuration.id;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <label>Name:</label>
                </div>
                <div className="col-xs-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Configuration Name"
                        aria-label="Configuration Name"
                        name="name"
                        value={configuration.name}
                        onChange={this.updateClickHandler}></input>
                </div>
                <div className="col-xs-4">
                    <Link to={editUrl}>
                        <button
                            type="button"
                            className="btn btn-primary">
                            Edit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}