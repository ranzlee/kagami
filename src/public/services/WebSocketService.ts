import * as io from 'socket.io-client';

export class WebSocketService {
    private static socket: any;
    private static listeningSockets: any = {};

    public static initialize() {
        this.socket = io.connect('https://localhost:3001');
    }

    public static listenToConfiguration(configurationId: string) {
        this.listeningSockets[configurationId] = this.socket.on(configurationId,
            (data: any) => {
                console.log(data);
            });
    }

    public static stopListeningToConfiguration(configurationId: string) {
        delete this.listeningSockets[configurationId];
    }
}