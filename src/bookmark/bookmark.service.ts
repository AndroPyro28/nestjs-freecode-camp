import { Injectable } from '@nestjs/common';
import { CreateBookMarkDto, UpdateBookmarkDto } from './dto';
import { createBookmark, deleteBookmarkById, getBookmarkById, getBookmarks, updateBookMarkById } from '../../models';
import { Bookmark } from '@prisma/client';
@Injectable()
export class BookmarkService {
    async createBookmark(userId: number, body: CreateBookMarkDto) {
        return await createBookmark(userId, body);
    }

    async getBookmarks(userId: number): Promise<Bookmark[]> {
        return await getBookmarks(userId);
    }

    async getBookmarkById(userId: number, bookmarkId: number) {
         return await getBookmarkById(userId,bookmarkId);
    }

    async updateBookMarkById(bookmarkId: number, body: UpdateBookmarkDto, ) {
        return await updateBookMarkById(bookmarkId, body);
    }

    async deleteBookmarkById(bookmarkId: number) {
        return await deleteBookmarkById(bookmarkId);
    }
}
