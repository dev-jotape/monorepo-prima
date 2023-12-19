import { prisma } from '../database';
import { QueueService } from './queue.service';

class UserService {
    private queueService: QueueService;

    constructor() {
        this.queueService = new QueueService();
    }

    create = async (data: {
        email: string,
        name: string,
        preferredGenres: string[],
        readingHistory?: number[]
    }) => {
        try {
            const { email, name, preferredGenres, readingHistory } = data;

            const result = await prisma.user.create({
                data: {
                    email,
                    name,
                    preferredGenres,
                    readingHistory: {
                        create: readingHistory?.map(el => ({
                            bookId: el,
                        })),
                    }
                }
            });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    get = async(id: number) => {
        const result = await prisma.user.findFirst({
            where: {
                id,
            },
            include: { readingHistory: true }
        });

        if (result) {
            return result
        } else {
            throw new Error("Invalid user")
        }
    }

    update = async (
        id: number,
        data: {
            email?: string,
            name?: string,
            preferredGenres?: string[]
        }
    ) => {
        try {            
            const result = await prisma.user.update({
                where: {
                    id
                },
                data
            });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    addBook = async (userId: number, bookId: number) => {
        try {
            const result = await prisma.readingHistory.create({
                data: {
                    userId,
                    bookId
                }
            });

            // update preferred genres
            this.queueService.publish({
                userId
            });

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    deleteBook = async (userId: number, bookId: number) => {
        try {
            const result = await prisma.readingHistory.delete({
                where: {
                    userId_bookId: {
                        userId,
                        bookId
                    }
                }
            });

            // update preferred genres
            this.queueService.publish({
                userId
            });

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export { UserService }