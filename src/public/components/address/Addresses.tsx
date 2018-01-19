import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Set, List } from "immutable";
import { AddressRecord } from "./../../../shared/models/address/Address";
import { Address } from "./Address";
import { Card } from "../common/containers/Card";

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

  delete(index: number) {
    alert("In-Work");
  }

  renderAddresses(): JSX.Element[] {
    const { addresses } = this.props;
    if (!addresses.size) return null;

    var returnElements: JSX.Element[] = [];

    addresses.toIndexedSeq().toArray().forEach((address: AddressRecord, index: number) => {
      const callback = (propertyName: string, newValue: any, oldValue: any) => {
        this.handleAddressChange(index, propertyName, newValue, oldValue);
      };
      const title = "Address #" + (index + 1);
      const newElement = (
        <Card title={title} iconName="address-card">
          <Address address={address} key={index} onChange={callback} />
          <button className="btn btn-primary float-right" onClick={() => this.delete(index)}>
            Delete Address
        </button>
        </Card>);
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