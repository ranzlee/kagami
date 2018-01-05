import { Response, Request, NextFunction } from "express";
import { IConfigurationElement } from "./../shared/models/configuration/elements/IConfigurationElement";
import { ConfigurationElementEntity } from "./../models/ConfigurationElementEntity";

export const fetchConfigElementsByConfigId = (req: Request, res: Response): void => {
    const configId = req.params.id;
    if (configId) {
        ConfigurationElementEntity.find({ configId: configId }, (err, configElements) => {
            res.send(configElements);
            return;
        });
    }
    else {
        res.status(500).send(`No config ID specified for the fetch config elements apiError encountered while trying to update a configuration: ${configId} in the DB`);
    }
};

export const addConfigElement = (req: Request, res: Response): void => {
    const {configId, configElementType } = req.params;
    const newElement = new ConfigurationElementEntity();
    newElement.configElementType = configElementType;
    newElement.configId = configId;

    newElement.save((err: Error, configElement) => {
        if (err) {
            res.status(500).send(`Error encountered while trying to add a new configuration elememts to the DB`);
        }
        else {
            res.send(configElement);
        }
        return;
    });
};