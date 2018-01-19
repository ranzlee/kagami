import { ConfigElementEntity } from "./../models/ConfigElementEntity";
import { IField } from "./../shared/models/configuration/elements/Field";
import { ConfigElementEntityModel } from "./../models/ConfigElementEntity";
import { Response, Request, NextFunction } from "express";
import { getAddressDefaults } from "./../shared/models/address/Address";

export const addFieldAddress = (req: Request, res: Response): void => {
    const fieldId = req.params.id;

    if (fieldId) {
        ConfigElementEntity.findById(fieldId, (error: Error, configElement: ConfigElementEntityModel) => {
            const field = configElement as any as IField;
            if (!field.addresses) field.addresses = [];
            field.addresses.push(getAddressDefaults());
            configElement.save((err: Error) => {
                if (err) {
                    res.status(500).send(`Error encountered while trying to add an address on a field config element: ${fieldId} in the DB`);
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
    }
}

export const updateFieldAddress = (req: Request, res: Response): void => {
    const fieldId = req.params.id;
    const addressIndex = req.body.addressIndex;
    const propertyName = req.body.propertyName;
    const newValue = req.body.newValue;

    if (fieldId) {
        ConfigElementEntity.findById(fieldId, (error: Error, configElement: ConfigElementEntityModel) => {
            const field = configElement as any as IField;
            field.addresses[addressIndex][propertyName] = newValue;
            configElement.save((err: Error) => {
                if (err) {
                    res.status(500).send(`Error encountered while trying to update an address on a field config element: ${fieldId} in the DB`);
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
    }
}