import express, { Express } from "express";
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/sockets";

export default class Server {
  public app: Express;
  public io: socketIO.Server;
  public port: number;

  private static _instance: Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    this.httpServer = new http.Server(this.app);
    this.io = new socketIO.Server(this.httpServer);

    this.listenSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private listenSockets() {
    this.io.on("connection", (client) => {
      socket.desconnect(client);
    });
  }

  public listen(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
