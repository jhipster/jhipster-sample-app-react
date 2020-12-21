import dayjs from 'dayjs';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { ILabel } from 'app/shared/model/label.model';

export interface IOperation {
  id?: number;
  date?: string;
  description?: string;
  amount?: number;
  bankAccount?: IBankAccount;
  labels?: ILabel[];
}

export const defaultValue: Readonly<IOperation> = {};
