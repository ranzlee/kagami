import https = require("https");
import * as redisSocketIo from "socket.io-redis";
import * as socketIo from "socket.io";
import { SocketMessage } from "./models/SocketMessage";

export class SocketServer {
    private static io: SocketIO.Server;

    constructor(server: https.Server) {
        SocketServer.io = socketIo(server);

        SocketServer.io.adapter(redisSocketIo({
            host: 'redis',
            port: 6379
        }));
    }

    public static sendToRoom(configurationId: string, messageObj: SocketMessage) {

    }

    public static addNamespaace(configurationId: string) {
    }

    public static sendToNamespace(configurationId: string, messageObj: SocketMessage) {
        const nsp = SocketServer.io.of('/' + configurationId);

        nsp.emit("Event", messageObj);
    }
}