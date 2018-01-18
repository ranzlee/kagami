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
    updateClickHandler(event: any) : void {
        const {onChange, address} = this.props;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        onChange(name, value, address[name]);
    }

    render() {
        const {address} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <Textbox
                            name="addressLine1:"
                            type="text"
                            required={true}
                            placeholder="Address Line 1"
                            label="Address Line 1: "
                            value={address.addressLine1}
                            onChange={this.updateClickHandler}
                            labelColLg={3}
                            controlColLg={9}
                            labelColSm={6}
                            controlColSm={6} />
                    </div>
                </div>
            </div>
        );
    }
}