import { ConfigChangeEventType } from './../../enums/ConfigChangeEventType';

export abstract class BaseConfigChangeEvent {
    id: number;
    configId: string;
    configChangeEventType: ConfigChangeEventType;
}