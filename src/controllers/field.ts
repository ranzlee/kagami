import { IField } from "./../shared/models/configuration/elements/Field";
import { Response, Request, NextFunction } from "express";
import { getAddressDefaults } from "./../shared/models/address/Address";
import { FieldEntity, FieldEntityModel } from "./../models/FieldEntity";
import { ConfigElementType } from "./../shared/models/enums/ConfigElementType";

export const addFieldAddress = (req: Request, res: Response): void => {
    const fieldId = req.params.id;

    if (fieldId) {
        FieldEntity.findById(fieldId, (error: Error, fieldElement: FieldEntityModel) => {
            const field = fieldElement as IField;
            if (!field.addresses) field.addresses = [];
            field.addresses.push(getAddressDefaults());
            fieldElement.save((err: Error) => {
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
    const addressIndex = parseInt(req.body.addressIndex);
    const propertyName = req.body.propertyName;
    const newValue = req.body.newValue;

    if (fieldId) {
        FieldEntity.findById(fieldId, (error: Error, fieldElement: FieldEntityModel) => {
            const field = fieldElement as any as IField;
            field.addresses[addressIndex][propertyName] = newValue;
            fieldElement.save((err: Error) => {
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