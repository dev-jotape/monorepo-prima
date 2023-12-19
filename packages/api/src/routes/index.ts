import { Router } from 'express';
import bookRoute from './book.route';
import userRoute from './user.route';

export default (): Router => {
    const app = Router();
    bookRoute(app);
    userRoute(app);

    return app;
}