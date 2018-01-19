import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Set, List } from "immutable";
import { AddressRecord } from "./../../../shared/models/address/Address";
import { Address } from "./Address";

export interface IOwnProps {
  addresses: List<AddressRecord>;
  onChange: (index: number, propertyName: string, newValue: any, oldValue: any) => void;
}

export class Addresses extends React.Component<IOwnProps, {}>
{
  handleAddressChange(index: number, propertyName: string, newValue: any, oldValue: any): void {
    const { onChange } = this.props;
    onChange(index, propertyName, newValue, oldValue)
  }

  renderAddresses(): JSX.Element[] {
    const { addresses } = this.props;
    if (!addresses.size) return null;

    var returnElements: JSX.Element[] = [];

    addresses.toIndexedSeq().toArray().forEach((address: AddressRecord, index: number) => {
      const callback = (propertyName: string, newValue: any, oldValue: any) => {
        this.handleAddressChange(index, propertyName, newValue, oldValue);
      };
      const newElement = (<Address address={address} key={index} onChange={callback} />);
      returnElements.push(newElement);
    });

    return returnElements;
  }


  render() {
    return (
      <div>
        {this.renderAddresses()}
      </div>
    );
  }
}