import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import * as UserValidator from '../validators/user.validator';

export default (app: Router) => {
    const route = Router();
    const controller = new UserController();

    app.use('/users', route);

    /**
     * @swagger
     * 
     * /users/signunp:
     *  post:
     *      tags:
     *          - "users"
     *      summary: "Create user"
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                    type: object
     *                    properties:
     *                        username:
     *                            type: string
     *                            required: true
     *                        password:
     *                            type: string
     *                            required: true
     *          responses:
     *              "200":
     *                  description: "Success"
     *              "403":
     *                  description: "Invalid input"
     */
    route.post('/', controller.create);

    route.get('/:id', controller.get);

    route.put('/:id', controller.update);

    route.post('/:id/reading-history', controller.addBook);
    
    route.delete('/:id/reading-history/:book', controller.deleteBook);
}