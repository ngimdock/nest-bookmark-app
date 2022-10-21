import { Body, Controller, Param, Post, Delete, Get } from '@nestjs/common';
import { ResponseBody } from 'src/users/types';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Controller('api/bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async findAll() {
    const responseMessage = 'Bookmarks found on successffully';
    return new ResponseBody(
      200,
      responseMessage,
      await this.bookmarkService.findAll(),
    );
  }

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto) {
    const responseMessage = 'Bookmark created on successffully';
    return new ResponseBody(
      201,
      responseMessage,
      await this.bookmarkService.create(createBookmarkDto),
    );
  }

  @Delete(':id')
  async delete(@Param('id') bookmarkId: string) {
    const responseMessage = 'Bookmark deleted on successffully';
    return new ResponseBody(
      200,
      responseMessage,
      await this.bookmarkService.delete(bookmarkId),
    );
  }
}
