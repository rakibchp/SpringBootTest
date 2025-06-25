export interface Employee {

  id?: number;
  name: string;
  company: string;
  designation: string;
  department?: string;
  grade?: number;
  salary?: number;
  joiningDate?: Date; // or Date, if you're using Angular date picker
}
