import express, { json, urlencoded } from "express";
import Server from "./server/server";
import dotenv from 'dotenv';
import cors from 'cors'
import path from "path";
import dbConnection  from "./core/db/config";

dotenv.config();

const server = Server.instance;

server.app.use( urlencoded({extended: true}) )
server.app.use( json())
server.app.use( cors({ origin: true, credentials: true }) )
import('./helpers/passport/passport')

dbConnection()

server.app.use( express.static('dist/public') )

server.app.use( '/api/products', require('./routes/products.routes') )
server.app.use( '/api/carts', require('./routes/carts.routes') )
server.app.use( '/api/users', require('./routes/users.routes'))
server.app.use( '/api/login', require('./routes/auth.routes') )

server.app.get('*', (req, res) => {
  res.sendFile( path.join( __dirname, 'public/index.html' ) )
})

server.listen( () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ server.port }`);
})