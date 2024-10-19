 import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    POSTGRES_USERNAME,
    POSTGRES_HOST,
    POSTGRES_PORT_STRING,
    POSTGRES_DATABASE_TEST,
    POSTGRES_USERNAME_TEST,
    ENV
} = process.env;

const POSTGRES_PORT: number = Number.parseInt(POSTGRES_PORT_STRING ?? '0');

let client : Pool;

if(ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        database: POSTGRES_DATABASE_TEST,
        user: POSTGRES_USERNAME_TEST,
        password: POSTGRES_PASSWORD
    });
}
else // assume dev

//if(ENV === 'dev') // if both are in if, get error about usage before assignment
     {
    client = new Pool({
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        database: POSTGRES_DATABASE,
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD
    });
}




export default client;