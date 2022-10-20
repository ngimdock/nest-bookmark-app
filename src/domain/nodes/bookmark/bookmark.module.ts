import { Module } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.service';

@Module({
  providers: [BookmarkRepository],
})
export class BookmarkModule {}
