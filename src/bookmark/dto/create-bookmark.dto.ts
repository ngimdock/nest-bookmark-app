export class CreateBookmarkDto {
  title: string;
  url: string;
  description?: string;
}

export class CreateBookmarkBdDto extends CreateBookmarkDto {
  id: string;
  createdAt: number;
  updateAt: number;
}
