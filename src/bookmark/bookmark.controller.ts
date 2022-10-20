import { Body, Controller, Post } from '@nestjs/common';
import { ResponseBody } from 'src/users/types';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto) {
    const responseMessage = 'Bookmark created const successffully';
    return new ResponseBody(201, responseMessage, createBookmarkDto);
  }
}
