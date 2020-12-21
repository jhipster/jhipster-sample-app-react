import { IUser } from 'app/shared/model/user.model';
import { IOperation } from 'app/shared/model/operation.model';

export interface IBankAccount {
  id?: number;
  name?: string;
  balance?: number;
  user?: IUser;
  operations?: IOperation[];
}

export const defaultValue: Readonly<IBankAccount> = {};
