import dayjs from 'dayjs';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { ILabel } from 'app/shared/model/label.model';

export interface IOperation {
  id?: number;
  date?: dayjs.Dayjs;
  description?: string | null;
  amount?: number;
  bankAccount?: IBankAccount | null;
  labels?: ILabel[] | null;
}

export const defaultValue: Readonly<IOperation> = {};
