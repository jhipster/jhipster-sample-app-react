export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: null,
  login: null,
  firstName: null,
  lastName: null,
  email: null,
  activated: false,
  langKey: null,
  authorities: null,
  createdBy: null,
  createdDate: null,
  lastModifiedBy: null,
  lastModifiedDate: null,
  password: null
};
