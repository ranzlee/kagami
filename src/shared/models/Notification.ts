import * as Guid from 'guid';
export class Notification {
    constructor(type: string, message: string) {
        this.message = message;
        this.id = Guid.raw();
    }

    message: string;
    id: string;
    headline: string;
    showIcon: boolean;
    timeoutInMs: number;


    public static createSuccess(message: string) {
        return new Notification("success", message);
    }

    public static createInfo(message: string) {
        return new Notification("info", message);
    }

    public static createWarning(message: string) {
        return new Notification("warning", message);
    }

    public static createDanger(message: string) {
        return new Notification("danger", message);
    }
}