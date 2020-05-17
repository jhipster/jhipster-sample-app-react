import { Moment } from 'moment';
import { ILabel } from 'app/shared/model/label.model';

export interface IOperation {
  id?: number;
  date?: string;
  description?: string;
  amount?: number;
  bankAccountName?: string;
  bankAccountId?: number;
  labels?: ILabel[];
}

export const defaultValue: Readonly<IOperation> = {};
