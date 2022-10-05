import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookMarkDto, UpdateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')

export class BookmarkController {
    constructor(private bookmarService: BookmarkService) {}

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() body: CreateBookMarkDto) {
        return this.bookmarService.createBookmark(userId, body);
    }

    @Get()
    getBookmarks(
        @GetUser('id') userId: number) {
        return this.bookmarService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number) {
         return this.bookmarService.getBookmarkById(userId, bookmarkId)
    }

    @Patch(':id')
    updateBookMarkById(
        // @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() body: UpdateBookmarkDto) {
        return this.bookmarService.updateBookMarkById(bookmarkId, body);
    }

    @Delete(':id')
    deleteBookmarkById(
        // @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarService.deleteBookmarkById(bookmarkId);
    }
}
