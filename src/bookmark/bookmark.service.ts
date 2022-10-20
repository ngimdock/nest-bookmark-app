import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { BookmarkRepository } from 'src/domain/nodes/bookmark/bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkRepository.create({
      ...createBookmarkDto,
      id: uuid(),
      createdAt: Date.now(),
      updateAt: Date.now(),
    });
  }
}
