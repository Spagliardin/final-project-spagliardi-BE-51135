import express, { json, urlencoded } from "express";
import Server from "./server/server";
import dotenv from 'dotenv';
import cors from 'cors'
import path from "path";

dotenv.config();

const server = Server.instance;

server.app.use( urlencoded({extended: true}) )
server.app.use( json())
server.app.use( cors({ origin: true, credentials: true }) )

server.app.use( express.static('dist/public') )

server.app.use( '/api/products', require('./routes/products.routes') )
server.app.use( '/api/carts', require('./routes/carts.routes') )

server.app.get('*', (req, res) => {
  res.sendFile( path.join( __dirname, 'public/index.html' ) )
})

server.listen( () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ server.port }`);
})