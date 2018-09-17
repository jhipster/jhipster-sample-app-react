import { IOperation } from 'app/shared/model/operation.model';

export interface ILabel {
  id?: number;
  label?: string;
  operations?: IOperation[];
}

export const defaultValue: Readonly<ILabel> = {};
