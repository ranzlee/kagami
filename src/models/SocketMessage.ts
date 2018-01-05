export class SocketMessage {
    public messageObject: any;
    public actionType: string;

    constructor(actionType: string, messageObject: any) {
        this.actionType = actionType;
        this.messageObject = messageObject;
    }
}