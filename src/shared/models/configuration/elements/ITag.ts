import { IConfigurationElement } from "configElements/IConfigurationElement";

export interface ITag extends IConfigurationElement {
    id: string;
    name: string;
}