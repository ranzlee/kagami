import * as React from "react";
import { IConfiguration } from "configElements/IConfiguration";
import { Row, Col, ControlLabel, FormGroup, FormControl } from "react-bootstrap";
import { ConfigElementType } from "configElements/ConfigElementType";

export interface IOwnProps {
    id: string;
}

export interface IConnectedState {
    configuration: IConfiguration;
}

export interface IConnectedDispatch {
    update: (
        id: string,
        entityType: ConfigElementType,
        propertyName: string, 
        newValue: any, 
        oldValue: any) => void;
    delete: () => void;
}

export class Configurations extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {
    updateClickHandler = (event: any) => {
        const {configuration, update} = this.props;
        
        const target = event.target;
        const value = target.value;
        const name = target.name;

        update(configuration.id, ConfigElementType.configuration, name, value, configuration[name]);
    }

    render() {
        const { configuration, update, delete } = this.props;
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