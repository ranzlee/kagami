import * as React from "react";
import { Button } from "react-bootstrap";
import { Config } from "./../../containers/configurations/ConfigContainer";

export interface IOwnProps {
}

export interface IConnectedState {
    configurationIds: string[];
}

export interface IConnectedDispatch {
    add: () => void;
}

export class Configurations extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {

    private renderConfigs(): JSX.Element[] {
        var returnElements: JSX.Element[] = [];

        const { configurationIds } = this.props;

        for (var i = 0; i < configurationIds.length; i++) {
            returnElements.push(<Config id={configurationIds[i]}></Config>)
        }
        return returnElements;
    }

    render() {
        const { add } = this.props;
        return (
            <div>
                <h1>Configurations</h1>
                <Button onClick={add}>Add Configuration</Button>
                <hr></hr>
                {this.renderConfigs()}
            </div>
        );
    }
}