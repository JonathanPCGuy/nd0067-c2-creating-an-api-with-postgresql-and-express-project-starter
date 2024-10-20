import client from "../database";

export type Book = {
    title: string;
    author: string;
    total_pages: number;
    type: string;
    summary: string;
    id?: number;
}

export class BookStore {
    async index(): Promise<Book[]> {
        try
        {
            const conn = await client.connect();
            const sql = 'SELECT * from books';
            const result = await client.query(sql);
            conn.release();
            return await result.rows;
        }
        
        catch(err) {
            throw new Error("Cannot get book");

        }
    }

    async get(id: number) : Promise<Book>  {
        try
        {
            const conn = await client.connect();
            const sql = `SELECT * from books WHERE id=${id}`;
            const result = await client.query(sql);
            conn.release();
            // better way to do this?
            if(result.rowCount > 0)
                return await result.rows[0];
            else
                return {
                    title: "",
                    author: "",
                    total_pages: -1,
                    type: "",
                    summary: "",
                    id: -1
                };
        }
        catch(err)
        {
            throw new Error("Cannot get book");
        }
        
    }

    // async delete(id: number) : Promise<void>
    // {

    // }

    async remove(id: number) : Promise<void> {
        try
        {
            const conn = await client.connect();
            const sql = `DELETE from books WHERE id=${id}`;
            const result = await client.query(sql);
            conn.release();
        }
        catch(err)
        {
            // throwing here crashes the server
            throw new Error("Error while trying to delete");
        }
    }

    async add(book: Book) : Promise<number>
    {
        try
        {
            // to do: figure out error handling
            // whole server is crashing when error thrown
            const conn = await client.connect();
            const sql :string = `INSERT INTO books (title, author, total_pages, type, summary) VALUES ('${book.title}', '${book.author}', ${book.total_pages}, '${book.type}', '${book.summary}') RETURNING id`;

            const result = await client.query(sql);

            // to figure out: how to get back id of added book

            conn.release();

            // to figure out: how to debug with debugger
            // unbound breakpoint error, something to do with configuration

            console.log(JSON.stringify(result.rows[0]));

            return await result.rows[0].id; // is there a better way to do this?
        }
        catch(err)
        {
            let message;
            if(err instanceof Error) message = err.message;
            else message = String(err);
            throw new Error(message);
        }
        
    }

    async update(book: Book) : Promise<void> {
        try
        {
            // for now replace all values
            // ideally only update specified values (do later)
            
            // to do: figure out error handling
            // whole server is crashing when error thrown
            const conn = await client.connect();
            const sql :string = `UPDATE books SET title = "${book.title}", author="${book.author}", total_pages=${book.total_pages}, type="${book.type}", summary="${book.summary}" WHERE id = ${book.id}`;

            const result = await client.query(sql);

            // to figure out: how to get back id of added book

            conn.release();

            // to figure out: how to debug with debugger
            // unbound breakpoint error, something to do with configuration

            //console.log(JSON.stringify(result.rows[0]));

            //return await result.rows[0].id; // is there a better way to do this?
            return;
        }
        catch(err)
        {
            let message;
            if(err instanceof Error) message = err.message;
            else message = String(err);
            throw new Error(message);
        }
    }

    // get a singular book based on id
    // todo: support richer searches
    // how to scale to all fields?"
    // async get(id: number): Promise<Book>
    // {

    // }

    // async update(Book): Promise(boolean)
    // {

    // }
}