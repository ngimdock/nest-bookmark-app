import { Module } from '@nestjs/common';
import { BookmarkRepository } from 'src/domain/nodes/bookmark/bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
