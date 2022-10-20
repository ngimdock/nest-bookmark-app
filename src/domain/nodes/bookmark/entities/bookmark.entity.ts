export type BookmarkData = {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
};

export class Bookmark {
  private id: string;
  private title: string;
  private url: string;
  private description?: string;
  private createdAt: number;
  private updatedAt: number;

  constructor(data: BookmarkData) {
    this.initialize(data);
  }

  initialize(data: BookmarkData) {
    this.id = data.id;
    this.title = data.title;
    this.url = data.url;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  //getterns
  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getUrl(): string {
    return this.url;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }

  getUpdatedAt(): number {
    return this.updatedAt;
  }
}
