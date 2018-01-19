import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Set } from "immutable";
import { AddressRecord } from "./../../../shared/models/address/Address"
import { Textbox } from "../common/form-elements/Textbox";


export interface IOwnProps {
    address: AddressRecord;
    onChange: (propertyName: string, newValue: any, oldValue: any) => void;
}

export class Address extends React.Component<IOwnProps, {}>
{
    updateClickHandler(event: any): void {
        const { onChange, address } = this.props;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        onChange(name, value, address[name]);
    }

    render() {
        const { address } = this.props;
        return (
            <div>
                <Textbox
                    name="addressLine1"
                    type="text"
                    required={true}
                    placeholder="Address Line 1"
                    label="Address Line 1: "
                    value={address.addressLine1}
                    onChange={(event) => this.updateClickHandler(event)}
                    labelColLg={3}
                    controlColLg={9}
                    labelColSm={6}
                    controlColSm={6} />
                <Textbox
                    name="addressLine2"
                    type="text"
                    required={true}
                    placeholder="Address Line 2"
                    label="Address Line 2: "
                    value={address.addressLine2}
                    onChange={(event) => this.updateClickHandler(event)}
                    labelColLg={3}
                    controlColLg={9}
                    labelColSm={6}
                    controlColSm={6} />
                <Textbox
                    name="city"
                    type="text"
                    required={true}
                    placeholder="City"
                    label="City: "
                    value={address.city}
                    onChange={(event) => this.updateClickHandler(event)}
                    labelColLg={3}
                    controlColLg={9}
                    labelColSm={6}
                    controlColSm={6} />
                <Textbox
                    name="state"
                    type="text"
                    required={true}
                    placeholder="State"
                    label="State: "
                    value={address.state}
                    onChange={(event) => this.updateClickHandler(event)}
                    labelColLg={3}
                    controlColLg={9}
                    labelColSm={6}
                    controlColSm={6} />
                <Textbox
                    name="zipcode"
                    type="text"
                    required={true}
                    placeholder="Zipcode"
                    label="Zipcode: "
                    value={address.zipcode}
                    onChange={(event) => this.updateClickHandler(event)}
                    labelColLg={3}
                    controlColLg={9}
                    labelColSm={6}
                    controlColSm={6} />
            </div>
        );
    }
}