 import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    POSTGRES_USERNAME,
    POSTGRES_HOST,
    POSTGRES_PORT_STRING
} = process.env;

const POSTGRES_PORT: number = Number.parseInt(POSTGRES_PORT_STRING ?? '0');

const client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD
});

export default client;