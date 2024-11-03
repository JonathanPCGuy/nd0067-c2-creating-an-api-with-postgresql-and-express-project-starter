import express, {Request, Response} from 'express';



const ordersRoutes = (app: express.Application) => {
    app.post('/orders', create);
    app.get('/orders/:id', show);
    app.get('/orders', index)
}