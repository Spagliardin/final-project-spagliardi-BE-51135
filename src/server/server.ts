import express, { Express } from "express";

export default class Server {

  public app: Express;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public start(callback: Function) {
    this.app.listen(this.port, callback());
  }
}
