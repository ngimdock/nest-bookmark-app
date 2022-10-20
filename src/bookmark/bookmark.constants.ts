const bookmark = 'bookmark';
const bookmarks = bookmark + 's';

export const BOOKMARK_CONSTANTS = {
  // singular
  BOOKMARK_LOWERCASE: bookmark.toLowerCase(),
  BOOKMARK_UPPERCASE: bookmark.toUpperCase(),
  BOOKMARK_FIRST_LETTER_UPPERCASE:
    bookmark.charAt(0).toUpperCase() + bookmark.slice(1).toLowerCase(),

  // plural
  BOOKMARKS_LOWERCASE: bookmarks.toLowerCase(),
  BOOKMARKS_UPPERCASE: bookmarks.toUpperCase(),
  BOOKMARKS_FIRST_LETTER_UPPERCASE:
    bookmarks.charAt(0).toUpperCase() + bookmark.slice(1).toLowerCase(),
};
