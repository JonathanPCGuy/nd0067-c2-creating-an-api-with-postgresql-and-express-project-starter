import client from "../database"
import bcrypt from 'bcrypt'

import dotenv from 'dotenv'
import { Connection } from "pg";

dotenv.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env;

const generateHash = async(pwd: string) : Promise<string>  => {
    return await bcrypt.hash(pwd + BCRYPT_PASSWORD, Number.parseInt(SALT_ROUNDS ?? '10'));
}


export type User = {
    username: string;
    pwd_digest?: string;
    id?: number
}

export class UserStore {
    async auth(username: string, password: string) : Promise<boolean> {
        // for now return string
        // either string works or we need a user auth object
        // or user hold jwt?
        // also way to unit test this beforehand?
        try
        {
            const conn = await client.connect();
            const digest = await generateHash(password);

            const sql: string = "SELECT * FROM USERS WHERE username=$1";

            const result = await client.query(sql, [username]);

            conn.release();

            if(digest === result.rows[0].pwd_digest)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            let message;
            if(err instanceof Error) message = err.message;
            else message = String(err);
            console.log(message);
            return false;
            // let message;
            // if(err instanceof Error) message = err.message;
            // else message = String(err);
            // throw new Error(message);
        }

    }

    // need to return something richer later
    async create(username: string, password: string) : Promise<User> {
        // this is where i need to do the hashing
        

        try
        {
            // to do: figure out error handling
            // whole server is crashing when error thrown
            
            const digest = await generateHash(password);

            
            const conn = await client.connect();

            // TODO: disallow duplicate user
            // DO THIS LATER

            //const sql :string = "INSERT INTO users (username, pwd_digest) VALUES ($1, $2);";
            const sql :string = "INSERT INTO users (username, pwd_digest) VALUES ($1, $2) returning *;";


            const result = await client.query(sql, [username, digest]);

            // to figure out: how to get back id of added book
            // i think i have to do it manually

            conn.release();

            // to figure out: how to debug with debugger
            // unbound breakpoint error, something to do with configuration
            // it is being made but for some reason no values are coming out
            let createdUser : User = {
                username : result.rows[0].username,
                id : result.rows[0].id
            }
            console.log(JSON.stringify(result.rows[0]));

            return createdUser; // is there a better way to do this?
        }
        catch(err)
        {
            let message;
            if(err instanceof Error) message = err.message;
            else message = String(err);
            console.log(message);
            return -1;
            //throw new Error(message);
        }
    }
}