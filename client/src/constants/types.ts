export type Vehicle = {
  vin: string;
  year: number;
  make: string;
  model: string;
};

export type Contact = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  state: string;
  zipCode: number;
};

export type FORM_DATA = Contact & {
  vehicles: Vehicle[];
};
