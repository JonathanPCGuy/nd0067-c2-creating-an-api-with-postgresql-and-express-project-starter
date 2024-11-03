import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const {
    TOKEN_SECRET
} = process.env;

// do i need ; in import?

const userStore = new UserStore();

// index for user is bad practice
// should only be internal way to access

const create = async(req: Request, res: Response) => {
    // normally you would want to make the user object
    // and just pass it in

    // however because passwords is it a good idea?
    // will complete then look at answer
    const username = req.body.username;
    const pwd = req.body.password;

    let createdUser = await userStore.create(username, pwd);
    if(createdUser.id?? 0 > 0)
    {
        // this is bad. i want to throw is TOKEN_SECRET is not set
        if(TOKEN_SECRET??"".length == 0)
        {
            throw Error("server configuration error");
        }
        var token = jwt.sign({user: username, id: createdUser.id}, TOKEN_SECRET?? "");
        res.status(201);
        res.json(token);
    }
    else
    {
        res.status(400).send("Failed to create user.");
    }

}
const verifyToken = async(req: Request, res: Response) => {
    // debug endpoint to verify token
}

const auth = async(req: Request, res: Response) => {
    // const username = req.body.username;
    // const pwd = req.body.password;

    // TODO: undo the above and use this to create the jwt

    const token = req.body.token;

    if(jwt.verify(token,  TOKEN_SECRET?? ""))
    {
        res.status(200).send("auth success");
    }
    else
    {
        res.status(401).send("unauth or other error");
    }

    // if(await userStore.auth(username, pwd))
    // {
    //     jwt.sign(username,)
    //     res.status(200).send("auth success");
    // }
    // else
    // {
    //     res.status(401).send("unauth or other error");
    // }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.put('/users/auth', auth);
}

export default userRoutes;