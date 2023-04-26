import { isBefore, sub } from "date-fns";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import FlexBox from "components/atoms/FlexBox";

import { INITIAL_VALUES } from "constants";
import ContactInfo from "./ContactInfo";
import VehicleInfo from "./VehicleInfo";
import { Button } from "@mui/material";
import { useGetApplication, useUpdateApplication } from "services/application";
import InputField from "components/molecules/InputField";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .test(
      "is-at-least-sixteen",
      "You must be at least 16 years old",
      (value) => {
        const minimumDate = sub(currentDate, { years: 16 });
        return isBefore(value, minimumDate);
      }
    ),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.number()
    .required("Zip code is required")
    .typeError("Zip code must be a number"),
  vehicles: Yup.array()
    .max(3, "You can only add up to 3 vehicles")
    .of(
      Yup.object().shape({
        vin: Yup.string().required("VIN is required"),
        year: Yup.number()
          .min(1985, "Year must be greater than or equal to 1985")
          .max(
            currentYear + 1,
            `Year must be less than or equal to ${currentYear + 1}`
          )
          .required("Year is required")
          .test(
            "is-four-digits",
            "Year must be in YYYY format",
            (value) => value.toString().length === 4
          )
          .typeError("Year must be a number"),
        make: Yup.string().required("Make is required"),
        model: Yup.string().required("Model is required"),
      })
    ),
});

const Form = ({ applicationRef }: { applicationRef: string }) => {
  const { data } = useGetApplication(applicationRef);
  const { mutate, isError, isSuccess } = useUpdateApplication();

  return (
    <Formik
      enableReinitialize
      initialValues={data ?? INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={(values) =>
        mutate({ applicationRef, body: JSON.stringify(values) })
      }
    >
      {({ values, handleChange, handleBlur }) => (
        <FormikForm>
          <FlexBox flexDirection="column" rowGap={4}>
            <ContactInfo
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <VehicleInfo
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <FlexBox columnGap={1}>
              <Button type="submit" variant="contained" fullWidth>
                Update
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Get Quote
              </Button>
            </FlexBox>
          </FlexBox>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
