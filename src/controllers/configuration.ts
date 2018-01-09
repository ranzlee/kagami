import { Configuration } from "./../shared/models/configuration/Configuration";
import { IConfigElement } from "./../shared/models/configuration/elements/IConfigElement";
import { Response, Request, NextFunction } from "express";
import { ConfigurationEntity } from "./../models/ConfigurationEntity";
import { ConfigElementEntity } from "./../models/ConfigElementEntity";
import { SocketServer } from "./../socketServer";
import { SocketMessage } from "./../models/SocketMessage";

export const fetchConfigurations = (req: Request, res: Response): void => {
    ConfigurationEntity.find({}, (err, configs) => {
        res.send(configs);
        return;
    });
};

export const addConfiguration = (req: Request, res: Response): void => {
    const config = new ConfigurationEntity();
    config.save((err: Error, updatedConfig) => {
        if (err) {
            res.status(500).send(`Error encountered while trying to add a new configurations to the DB`);
        }
        else {
            res.send(updatedConfig);
        }
        return;
    });
};

export const updateConfiguration = (req: Request, res: Response): void => {
    const configId = req.params.id;
    const propertyName = req.body.propertyName;
    const newValue = req.body.newValue;

    if (configId) {
        const changeObject: any = {};
        changeObject[propertyName] = newValue;

        ConfigurationEntity.findByIdAndUpdate(configId, changeObject, { new: true }, (err: Error, updatedConfig: any) => {
            if (err) {
                res.status(500).send(`Error encountered while trying to update a configuration: ${configId} in the DB`);
            }
            else {
                res.sendStatus(200);
                SocketServer.sendToNamespace(configId, new SocketMessage("Update", {
                    propertyName: propertyName,
                    value: newValue
                }));
            }
            return;
        });
    } else {
        res.status(500).send(`No config id passed into update configuration`);
    }
}