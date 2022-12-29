export interface IPhoto extends Document {
  // id?: string;
  _id?: string;
  name: string;
  description?: string;
  // name_belongingTo: string;
  // heOrIt_belongingTo?:
  //   | IUser[]
  //   | IEstablishment[]
  //   | IEmployee[]
  //   | ICede[]
  //   | IService[]
  //   | IProduct[];
  // referenceWhereItBelongs:
  photoPath: string;
}
