import { Router } from 'express';
import { BookController } from '../controllers/book.controller';

export default (app: Router) => {
    const route = Router();
    const controller = new BookController();

    app.use('/books', route);

    route.get('/', controller.list);
    route.get('/:id', controller.get);
}