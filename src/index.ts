import { json, urlencoded } from "express";
import Server from "./server/server";
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const port = Number( process.env.PORT )
const server = new Server( port )


server.app.use( urlencoded({extended: true}) )
server.app.use( json())
server.app.use( cors({ origin: true, credentials: true }) )

server.app.use( '/api/products', require('./routes/products.routes') )
server.app.use( '/api/carts', require('./routes/carts.routes') )

server.start( () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})