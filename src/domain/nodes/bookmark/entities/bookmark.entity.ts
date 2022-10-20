export type BookmarkData = {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Bookmark {
  private _id: string;
  private _title: string;
  private _url: string;
  private _description?: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: BookmarkData) {
    this.initialize(data);
  }

  initialize(data: BookmarkData) {
    this._id = data.id;
    this._title = data.title;
    this._url = data.url;
    this._description = data.description;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
  }

  //getterns
  getId(): string {
    return this._id;
  }

  getTitle(): string {
    return this._title;
  }

  getUrl(): string {
    return this._url;
  }

  getDescription(): string | undefined {
    return this._description;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }
}
