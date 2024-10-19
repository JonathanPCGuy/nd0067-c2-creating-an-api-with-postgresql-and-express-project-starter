import express from 'express';
import {BookStore, type Book} from '../../../models/book'
import bodyParser from 'body-parser';

const booksRoute = express.Router();

booksRoute.get('/', async(req: express.Request, res: express.Response) => {
    // lets do this one first
    //

    try
    {
        let bookstore : BookStore = new BookStore();

        let results : Book[] = await bookstore.index();
        res.send(JSON.stringify(results));
    }
    catch(err)
    {
        res.status(400).send('{"error":"unable to get all books"');
    }


    // to figure out: best way to do above and below
    
});

booksRoute.post('/add', async(req: express.Request, res: express.Response) => {
    if(!req.body ) {
        res.sendStatus(400);
        return;
    } 

    try
    {
        let newBook : Book = {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            type: req.body.type,
            summary: req.body.summary
        };
    
        // is there a way to serialize?
    
        // need to better understand this
        let myBookStore : BookStore = new BookStore();
        let newId : number = await myBookStore.add(newBook);
        res.send(`{"id":${newId}}`);
    }
    catch(err)
    {
        res.sendStatus(400);
    }



});

booksRoute.get('/:id', async(req: express.Request, res: express.Response) => {
    
    if(!req.body || !req.body.id) {
        res.sendStatus(400);
        return;
    }

    // to do: add more error handling
    let myBookStore : BookStore = new BookStore(); // do i have to keep making one?
    let myBook: Book = await myBookStore.get(req.body.id);
    res.send(JSON.stringify(myBook));
});

booksRoute.delete('/:id', async(req: express.Request, res: express.Response) => {
    if(!req.body || !req.body.id) {
        res.sendStatus(400);
        return;
    }

    // to do: add more error handling
    let myBookStore : BookStore = new BookStore(); // do i have to keep making one?
    await myBookStore.remove(req.body.id);
    res.sendStatus(200);
});

export default booksRoute;