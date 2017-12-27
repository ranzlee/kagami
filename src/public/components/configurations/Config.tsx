import * as React from "react";
import { Row, Col, ControlLabel, FormGroup, FormControl } from "react-bootstrap";
import { Configuration } from "./../../../shared/models/configuration/Configuration"
import { ConfigElementType } from "../../../shared/models/enums/ConfigElementType";

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
        return (
            <div>
                <FormGroup>
                    <ControlLabel >Name: </ControlLabel>
                    <FormControl
                        type="text"
                        name="name"
                        value={configuration.name}
                        placeholder="Configuration Name"
                        onChange={this.updateClickHandler}>
                    </FormControl>
                </FormGroup>
            </div >
        );
    }
}