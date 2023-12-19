import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const books = await prisma.book.createMany({
      data: [
        {
            title: 'Book 1',
            description: 'desc 1',
            genre: 'Theme1',
        },
        {
            title: 'Book 2',
            description: 'desc 2',
            genre: 'Theme2',
        },
        {
            title: 'Book 3',
            description: 'desc 3',
            genre: 'Theme3',
        },
    ]
  })
  console.log(books)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })