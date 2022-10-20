import { BookmarkData } from '../../bookmark/entities/bookmark.entity';

export type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber?: string;
  bookmarks: BookmarkData[];
};

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;
  private phoneNumber?: string;

  constructor(data: UserData) {
    this.initialize(data);
  }

  // methods
  initialize(data: UserData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phoneNumber = data.phoneNumber;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // getters

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getPhoneNumber(): string | undefined {
    return this.phoneNumber;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
