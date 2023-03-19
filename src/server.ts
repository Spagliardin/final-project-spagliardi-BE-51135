import express, { Express } from "express";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express()
const port = process.env.PORT

app.use(express.json())

app.use( '/api/products', require('./routes/products.routes') )
app.use( '/api/carts', require('./routes/carts.routes') )

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})