import { Injectable } from '@nestjs/common';
import { CreateBookMarkDto, UpdateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    createBookmark(userId: number, body: CreateBookMarkDto) {

    }

    getBookmarks(userId: number) {

    }

    getBookmarkById(userId: number, bookmarkId: number) {
         
    }

    updateBookMarkById(userId: number, bookmarkId: number, body: UpdateBookmarkDto, ) {

    }

    deleteBookmarkById(userId: number, bookmarkId: number) {

    }
}
