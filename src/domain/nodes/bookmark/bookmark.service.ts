import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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

  async checkIfBookmarkExist(bookmarkId: string): Promise<boolean> {
    const query = this.neo4jService.initQuery();

    try {
      const result = await query
        .matchNode(BookmarkRepository.BOOKMARK, BookmarkRepository.BOOKMARKS)
        .where({ [BookmarkRepository.BOOKMARK]: { id: bookmarkId } })
        .return(BookmarkRepository.BOOKMARK)
        .run();
      if (!result.length) return false;
      return true;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async findAll(): Promise<Bookmark[]> {
    const query = this.neo4jService.initQuery();

    try {
      const results = await query
        .matchNode(BookmarkRepository.BOOKMARK, BookmarkRepository.BOOKMARKS)
        .return(BookmarkRepository.BOOKMARK)
        .run();

      return results.map(
        (bookmark) =>
          new Bookmark(bookmark[BookmarkRepository.BOOKMARK].properties),
      );
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

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

      const bookmarkData = result[0][BookmarkRepository.BOOKMARK].properties;

      return new Bookmark({ ...bookmarkData });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async delete(bookmarkId: string): BoomarkResponseType {
    const query = this.neo4jService.initQuery();

    try {
      const bookmarkExist = await this.checkIfBookmarkExist(bookmarkId);

      if (!bookmarkExist)
        throw new NotFoundException(
          `Bookmark with the id ${bookmarkId} not found`,
        );

      const result = await query
        .matchNode(BookmarkRepository.BOOKMARK, BookmarkRepository.BOOKMARKS)
        .where({ [BookmarkRepository.BOOKMARK]: { id: bookmarkId } })
        .delete(BookmarkRepository.BOOKMARK)
        .return(BookmarkRepository.BOOKMARK)
        .run();

      if (!result.length) throw new HttpException('Some thing went wrong', 500);

      const bookmarkData = result[0][BookmarkRepository.BOOKMARK].properties;

      return new Bookmark({ ...bookmarkData });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
