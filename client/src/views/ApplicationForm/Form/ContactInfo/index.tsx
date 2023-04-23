import { MenuItem } from "@mui/material";
import FlexBox from "components/atoms/FlexBox";
import InputField from "components/molecules/InputField";
import SectionHeader from "components/molecules/SectionHeader";
import { FormikHandlers } from "formik";
import { FORM_DATA, STATES, StateKey } from "views/ApplicationForm/constants";

interface ContactInfoProps {
  values: {
    firstName: FORM_DATA["firstName"];
    lastName: FORM_DATA["lastName"];
    street: FORM_DATA["street"];
    city: FORM_DATA["city"];
    state: FORM_DATA["state"];
    zipCode: FORM_DATA["zipCode"];
  };
  handleBlur: FormikHandlers["handleBlur"];
  handleChange: FormikHandlers["handleChange"];
}

const ContactInfo = ({
  values: { firstName, lastName, street, city, state, zipCode },
  handleBlur,
  handleChange,
}: ContactInfoProps) => (
  <FlexBox flexDirection="column" rowGap={2} style={{ width: "100%" }}>
    <SectionHeader title="Contact Information" />
    <FlexBox columnGap={1} justifyContent="stretch">
      <InputField
        label="First Name"
        name="firstName"
        value={firstName}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <InputField
        label="Last Name"
        name="lastName"
        value={lastName}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </FlexBox>

    <FlexBox columnGap={1}>
      <InputField
        label="Street Address"
        name="street"
        value={street}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </FlexBox>

    <FlexBox columnGap={1} style={{ width: "100%" }}>
      <InputField
        label="City"
        name="city"
        value={city}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <InputField
        label="State"
        name="state"
        value={state}
        onBlur={handleBlur}
        onChange={handleChange}
        select
      >
        {Object.keys(STATES).map((key) => (
          <MenuItem key={key} value={key}>
            {STATES[key as StateKey]}
          </MenuItem>
        ))}
      </InputField>
      <InputField
        label="Zip Code"
        name="zipCode"
        value={zipCode}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </FlexBox>
  </FlexBox>
);

export default ContactInfo;
