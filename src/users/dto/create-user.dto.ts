export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phoneNumber?: number;
  avatar?: string;
}

export class CreateUserBdDto extends CreateUserDto {
  id: string;
  passwordHash: string;
  createdAt: number;
  updatedAt: number;
  isEmailVerified: boolean;
}
