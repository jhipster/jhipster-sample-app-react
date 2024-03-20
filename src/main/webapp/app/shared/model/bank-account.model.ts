import { IUser } from 'app/shared/model/user.model';

export interface IBankAccount {
  id?: number;
  name?: string;
  balance?: number;
  user?: IUser | null;
}

export const defaultValue: Readonly<IBankAccount> = {};
