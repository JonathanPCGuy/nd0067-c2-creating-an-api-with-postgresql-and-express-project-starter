import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import client from './database'
import { PoolClient } from 'pg'


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

client.connect();

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    //client.connect().then(func)
    res.send('Hello World!')
})

app.get('/database', async (req: Request, res: Response) => {
   try
   {
    const myConnection : PoolClient = await client.connect();
    myConnection.release();
    res.send('database connection works');
   }
   catch
   {
    res.send('error connecting to db');
   }
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
