import { IEmployee } from './employee.interface';

export interface IEmployeeAccessToken {
  access_token: string;
  employeeId: string;
  employee: IEmployee;
}
