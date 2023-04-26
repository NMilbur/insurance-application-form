import { isBefore, isDate, parse, sub } from "date-fns";

export type Vehicle = {
  vin: string;
  year: number;
  make: string;
  model: string;
};

export type ApplicationData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  vehicles: Vehicle[];
};

export const getFormattedDOB = (input: string, format = "MM-dd-yyyy") =>
  parse(input, format, new Date());

export const validateApplicationData = (
  applicationData: ApplicationData,
  isInitialLoad = false
) => {
  const messages: string[] = [];
  const returnData: [boolean, string[]] = [true, messages];
  const currentDate = new Date();
  const {
    firstName,
    lastName,
    dateOfBirth,
    street,
    city,
    state,
    zipCode,
    vehicles,
  } = applicationData;

  if (!firstName) {
    returnData[0] = false;
    returnData[1].push("First name is required");
  }

  if (!lastName) {
    returnData[0] = false;
    returnData[1].push("Last name is required");
  }

  if (!isInitialLoad || dateOfBirth) {
    if (!isDate(dateOfBirth)) {
      returnData[0] = false;
      returnData[1].push("Date of birth must be formatted as MM-DD-YYYY");
    }

    const minimumDate = sub(currentDate, { years: 16 });
    if (!isBefore(dateOfBirth, minimumDate)) {
      returnData[0] = false;
      returnData[1].push("Applicant must be at least 16 years old");
    }
  }

  if (!isInitialLoad || zipCode) {
    if (isNaN(zipCode)) {
      returnData[0] = false;
      returnData[1].push("Zip code must be a numerical value");
    }
  }

  if (!isInitialLoad || vehicles) {
    if (vehicles.length > 3) {
      returnData[0] = false;
      returnData[1].push("Must have no more than 3 vehicles");
    }

    for (const idx in vehicles) {
      const { year } = vehicles[idx];

      if (!year) continue;

      if (isNaN(year)) {
        returnData[0] = false;
        returnData[1].push(
          `Year must be a numerical value for vehicle #${idx + 1}`
        );
      } else {
        if (year.toString().length !== 4) {
          returnData[0] = false;
          returnData[1].push(
            `Year must be in YYYY format for vehicle #${idx + 1}`
          );
        }

        if (year < 1985 || year > currentDate.getFullYear() + 1) {
          returnData[0] = false;
          returnData[1].push(
            `Year must be at least 1985 or less than ${
              currentDate.getFullYear() + 1
            } for vehicle #${idx + 1}`
          );
        }
      }
    }
  }

  if ((!isInitialLoad || state) && state.length > 2) {
    returnData[0] = false;
    returnData[1].push("State must be 2 letter abbreviation");
  }

  if (!isInitialLoad)
    if (!isInitialLoad) {
      if (!street) {
        returnData[0] = false;
        returnData[1].push("Street is required");
      }

      if (!city) {
        returnData[0] = false;
        returnData[1].push("City is required");
      }

      if (!state) {
        returnData[0] = false;
        returnData[1].push("state is required");
      }

      if (!zipCode) {
        returnData[0] = false;
        returnData[1].push("Zip code is required");
      }

      if (vehicles.length === 0) {
        returnData[0] = false;
        returnData[1].push("Must have at least 1 vehicle");
      }

      for (const idx in vehicles) {
        const { vin, year, make, model } = vehicles[idx];

        if (!vin) {
          returnData[0] = false;
          returnData[1].push(`VIN is required for vehicle #${idx + 1}`);
        }

        if (!year) {
          returnData[0] = false;
          returnData[1].push(`Year is required for vehicle #${idx + 1}`);
        }

        if (!make) {
          returnData[0] = false;
          returnData[1].push(`Make is required for vehicle #${idx + 1}`);
        }

        if (!model) {
          returnData[0] = false;
          returnData[1].push(`Model is required for vehicle #${idx + 1}`);
        }
      }
    }

  return returnData;
};
