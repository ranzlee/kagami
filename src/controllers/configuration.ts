import { Configuration } from "./../shared/models/configuration/Configuration";
import { IConfigurationElement } from "./../shared/models/configuration/elements/IConfigurationElement";
import { Response, Request, NextFunction } from "express";
import { ConfigurationEntity } from "./../models/ConfigurationEntity";
import { ConfigurationElementEntity } from "./../models/ConfigurationElementEntity";

interface IConfigResponse {
    configuration: Configuration;
    configElements: IConfigurationElement[]
}

export const getEntireConfiguration = (req: Request, res: Response): IConfigResponse | void => {
    const configId = req.params.id;
    if (configId) {
        ConfigurationEntity.findById(configId, (err, config) => {
            if (err) {
                res.status(500).send(`Could not find Config: ${configId} in the DB`);
                return;
            }
            ConfigurationElementEntity.find({ configId: configId }, (err, configElements) => {
                var response: IConfigResponse = {
                    configuration: config as Configuration,
                    configElements: configElements as IConfigurationElement[]
                };
                res.send(response);
                return;
            });
        })
    }
    res.send();
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
        const config = new ConfigurationEntity();
        config._id = configId;
        config[propertyName] = newValue;
        config.save((err: Error) => {
            if (err) {
                res.status(500).send(`Error encountered while trying to update a configuration: ${configId} in the DB`);
            }
            else {
                res.sendStatus(200);
            }
            return;
        });
    } else {
        res.status(500).send(`No config id passed into update configuration`);
    }
}