import { ConfigElementType } from './../../shared/models/configuration/elements/ConfigElementType';
import axios from 'axios';

export const fetchConfiguration = (id: string) => {
    return axios.get("./api/configuration/" + id);
}

export const updateConfigEntity = (id: string, entityType: ConfigElementType, propertyName: string, newValue: any) => {
    return axios.post("./api/configEntity", {
        id,
        entityType,
         propertyName,
         newValue  
    }, )
}