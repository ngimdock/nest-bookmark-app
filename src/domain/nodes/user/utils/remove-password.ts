import { CreateUserBdDto } from 'src/users/dto/create-user.dto';

export const removePasswordToData = (userData: CreateUserBdDto) => {
  const { password, passwordHash, ...userDataWithoutPassword } = userData;

  return userDataWithoutPassword;
};
