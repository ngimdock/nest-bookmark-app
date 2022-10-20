export class CreateBookmarkDto {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export class CreateBookmarkBdDto extends CreateBookmarkDto {
  createdAt: number;
  updateAt: number;
}
