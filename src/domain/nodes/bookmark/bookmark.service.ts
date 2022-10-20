import { HttpException, Injectable } from '@nestjs/common';
import { BOOKMARK_CONSTANTS } from 'src/bookmark/bookmark.constants';
import { CreateBookmarkBdDto } from 'src/bookmark/dto/create-bookmark.dto';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Bookmark } from './entities/bookmark.entity';

type BoomarkResponseType = Promise<Bookmark> | null;

@Injectable()
export class BookmarkRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  static BOOKMARK = BOOKMARK_CONSTANTS.BOOKMARK_LOWERCASE;
  static BOOKMARKS = BOOKMARK_CONSTANTS.BOOKMARK_FIRST_LETTER_UPPERCASE;

  async create(bookmarkDbDto: CreateBookmarkBdDto): BoomarkResponseType {
    const query = this.neo4jService.initQuery();

    try {
      const result = await query
        .createNode(
          BookmarkRepository.BOOKMARK,
          BookmarkRepository.BOOKMARKS,
          bookmarkDbDto,
        )
        .return(BookmarkRepository.BOOKMARK)
        .run();

      if (!result.length)
        throw new HttpException('Some things wend wrong', 500);

      const userData = result[0][BookmarkRepository.BOOKMARK].properties;

      return new Bookmark({ ...userData });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
