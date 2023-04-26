export type Vehicle = {
  vin: string;
  year: number;
  make: string;
  model: string;
};

export type FORM_DATA = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  vehicles: Vehicle[];
};
