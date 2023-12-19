import { Response } from "express";
import { RequestWithUser } from '../middlewares/interface';
import { services } from '@boilerplate-node/core';

class BookController {
    private bookService: services.BookService;

    constructor() {
        this.bookService = new services.BookService();
    }

    list = (req: RequestWithUser, res: Response) => {
        const query = req.query
        this.bookService.list(query)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }

    get = (req: RequestWithUser, res: Response) => {
        const { id } = req.params
        this.bookService.get(parseInt(id))
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }
}

export { BookController }