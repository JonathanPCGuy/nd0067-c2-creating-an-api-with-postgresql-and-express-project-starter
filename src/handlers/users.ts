import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';

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

    let userIdNumber = await userStore.create(username, pwd);
    if(userIdNumber >0)
    {
        res.status(201).send(`"User create with id ${userIdNumber}`);
    }
    else
    {
        res.status(400).send("Failed to create user.");
    }

}

const auth = async(req: Request, res: Response) => {
    const username = req.body.username;
    const pwd = req.body.password;

    if(await userStore.auth(username, pwd))
    {
        res.status(200).send("auth success");
    }
    else
    {
        res.status(401).send("unauth or other error");
    }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.put('/users/auth', auth);
}

export default userRoutes;