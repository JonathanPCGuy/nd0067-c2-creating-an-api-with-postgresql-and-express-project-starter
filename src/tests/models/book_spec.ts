import { BookStore, Book } from "../../models/book";

describe("book spec", function() {

    let firstBook : Book = {
        title: "Test book one",
        author: "Test Author one",
        total_pages: 200,
        type: "Type one",
        summary: "long summary one"
    };

    let secondBook : Book = {
        title: "Test book two",
        author: "Test Author two",
        total_pages: 200,
        type: "Type two",
        summary: "long summary two"
    };

    let thirdBook : Book = {
        title: "Test book three",
        author: "Test Author three",
        total_pages: 200,
        type: "Type three",
        summary: "long summary three"
    };
    
    
    it('should be able to add books', async() => {
        const myBookStore : BookStore = new BookStore();
        let addedBook: number = await myBookStore.add(firstBook);
        expect(addedBook).toBeGreaterThan(0);
    });

    it('should be able to delete books', async() => {
        const myBookStore : BookStore = new BookStore();
        let addedBook: number = await myBookStore.add(secondBook);
        await myBookStore.remove(addedBook);

        // verify book is gone
        let goneBook: Book = await myBookStore.get(addedBook);
        expect(goneBook.id).toBe(-1);

    });

    it('should be able to get a book by id', async() => {
        const myBookStore : BookStore = new BookStore();
        let addedBook: number = await myBookStore.add(thirdBook);

        let retrievedBook: Book = await myBookStore.get(addedBook);
        expect(retrievedBook.title).toBe(thirdBook.title);        
    });
});