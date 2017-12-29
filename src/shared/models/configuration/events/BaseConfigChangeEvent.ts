import { ConfigChangeEventType } from './../../enums/ConfigChangeEventType';

export abstract class BaseConfigChangeEvent {
    _id: number;
    configId: string;
    configChangeEventType: ConfigChangeEventType;
}