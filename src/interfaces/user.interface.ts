import { IAppointment } from './appointment.interface';
import { IPhoto } from './photo.interface';
import { IPurchase } from './purchase.interface';
import { ITypeDocument } from './type-document.interface';

export interface IUser extends Document {
  // id?: string;
  _id?: string;
  // documentType: string;
  // documentType: ITypeDocument[];
  documentType: ITypeDocument;
  documentNumber: string;
  username: string;
  names: string;
  surnames: string;
  email: string;
  password: string;
  photos?: IPhoto[];
  historyOfAdvisedPurchases?: IPurchase[];
  historyOfCounselingAppointments?: IAppointment[];
  createdAt: Date;
}
