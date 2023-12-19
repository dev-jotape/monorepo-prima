import { Request, Response } from "express";
import { services } from '@boilerplate-node/core';

class UserController {
    private userService: services.UserService;

    constructor() {
        this.userService = new services.UserService();
    }

    create = (req: Request, res: Response) => {
        const data = req.body;
        this.userService.create(data)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }

    get = (req: Request, res: Response) => {
        const { id } = req.params;
        this.userService.get(parseInt(id))
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(403).send(err.message);
            });
    }

    update = (req: Request, res: Response) => {
        const { id } = req.params;
        const body = req.body;
        this.userService.update(parseInt(id), body)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(403).send(err.message);
            });
    }

    addBook = (req: Request, res: Response) => {
        const { id } = req.params;
        const { bookId } = req.body;
        this.userService.addBook(parseInt(id), bookId)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(403).send(err.message);
            });
    }

    deleteBook = (req: Request, res: Response) => {
        const { id, book } = req.params;
        this.userService.deleteBook(parseInt(id), parseInt(book))
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(403).send(err.message);
            });
    }
}

export { UserController }