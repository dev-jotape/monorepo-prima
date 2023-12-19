import { prisma, redis } from '../database';
import config from '../config';
import { QueueService } from './queue.service';

class BookService {
    constructor() {}

    list = async (
        query: {
            take?: string,
            skip?: string,
            orderBy?: string,
            genre?: string,
        }
    ) => {
        try {
            let key = 'title'
            let direction = 'desc'
            if (query.orderBy) {
                [key, direction] = query.orderBy.split(':');
            }

            let where = {}
            if (query.genre) {
                // filter by genre
                where = {
                    genre: query.genre
                }
            }

            const [count, data] = await prisma.$transaction([
                prisma.book.count({ where }),
                prisma.book.findMany({
                    where,
                    orderBy: {
                        [key]: direction
                    },
                    skip: query.skip ? parseInt(query.skip) : config.defaultSkip,
                    take: query.take ? parseInt(query.take) : config.defaultTake,
                })
            ]);

            return {
                count,
                data
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    get = async (
        id: number
    ) => {
        try {
            const book = await prisma.book.findFirst({
                where: {
                    id
                }
            });

            return book
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updatePreferred = async (userId: number) => {
        try {
            const user = await prisma.user.findFirst({
                include: {
                    readingHistory: {
                        include: {
                            book: true
                        }
                    }
                },
                where: {
                    id: userId
                }
            });

            const preferredGenres = user?.readingHistory.map(bookRead => bookRead.book.genre );

            console.log('preferredGenres => ', preferredGenres)
            await prisma.user.update({
                data: {
                    preferredGenres,
                },
                where: {
                    id: userId
                }
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export { BookService }