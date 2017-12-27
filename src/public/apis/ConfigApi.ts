import { IDomain } from './../types/AppStore';
import axios, { AxiosResponse } from 'axios';
import { ConfigElementType } from '../../shared/models/enums/ConfigElementType';

export const fetchConfiguration = async (id: string): Promise<IDomain> => {
    var response = await axios.get("./api/configuration/" + id);
    return response.data;
}

export const updateConfigEntity = (id: string, entityType: ConfigElementType, propertyName: string, newValue: any) => {
    return axios.post("./api/configEntity", {
        id,
        entityType,
        propertyName,
        newValue
    }, )
}