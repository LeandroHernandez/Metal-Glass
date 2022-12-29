import { IEmployee } from './employee.interface';
import { IUser } from './user.interface';

export interface IAssignment extends Document {
  // id?: string;
  _id?: string;
  administratorWhoAssigns?: IUser;
  employeeWhoAssigns?: IEmployee;
  administratorsResponsibleForTheAssigned?: IUser[];
  employeesResponsibleForTheAssigned?: IEmployee[];
  theAssigned: string;
  createdAt?: Date;
}
