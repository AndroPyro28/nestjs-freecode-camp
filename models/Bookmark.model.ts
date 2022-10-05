import {PrismaClient, Bookmark} from "@prisma/client"
import { CreateBookMarkDto, UpdateBookmarkDto } from "src/bookmark/dto";

const prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'query',
          },
          {
            emit: 'stdout',
            level: 'error',
          },
          {
            emit: 'stdout',
            level: 'info',
          },
          {
            emit: 'stdout',
            level: 'warn',
          },
    ]
});

const { bookmark } = prisma;

export async function createBookmark(userId:number, body: CreateBookMarkDto) {
  const {description, link, title} = body;
    return await bookmark.create({
      data: {
        user_id: userId,
        description,
        link,
        title
      }
    })
} 

export async function getBookmarks(userId: number) {
    return await bookmark.findMany({
        where: {
            user_id: userId
        }
    });
} 

export async function getBookmarkById(userId: number,boormakId: number) {
    return await bookmark.findFirst({
      where: {
        id: boormakId,
        user_id: userId
      }
    })
    
} 

export async function updateBookMarkById(boormakId: number, body: UpdateBookmarkDto) {
  return await bookmark.update({
    where: {
      id: boormakId
    },
    data: {
      ...body
    }
  })

}

export async function deleteBookmarkById(bookmarkId: number) {
  return await bookmark.delete({
    where: {
      id: bookmarkId
    }
  })
}