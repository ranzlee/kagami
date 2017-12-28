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
          }
          ConfigurationElementEntity.find({configId: configId}, (err, configElements) => {
            var response : IConfigResponse = {
                configuration: config as Configuration,
                configElements: configElements as IConfigurationElement[]
            };
            res.send(response)
          });
    })
    }
    res.send();
  };

  export const addConfiguration = (req: Request, res: Response): void => {
    const configId = req.params.id;
    if (configId) {
        const config = new ConfigurationEntity();
        config._id = configId;
        config.currentChangeEvent = 1;
        config.save((err: Error) => {
            res.status(500).send(`Error encountered while trying to add a new configurations to the DB`);
        });
    }
    res.sendStatus(200);
  };
  
  export const updateConfiguration =(req: Request, res: Response): void => { 
    const configId = req.params.id;
    const propertyName = req.body.propertyName;
    const newValue = req.body.newValue;

    if (configId) {
        const config = new ConfigurationEntity();
        config._id = configId;
        config[propertyName] = newValue;
        config.save((err: Error) => {
            res.status(500).send(`Error encountered while trying to add a new configurations to the DB`);
        });
    }
    res.sendStatus(200); 
  }