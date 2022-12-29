import { IUser } from './user.interface';

export interface IAccessToken {
  access_token: string;
  userId: string;
  user: IUser;
}
