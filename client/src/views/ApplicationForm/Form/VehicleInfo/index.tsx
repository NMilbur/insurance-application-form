import { FieldArray, FormikHandlers } from "formik";
import { Typography } from "@mui/material";
import FlexBox from "components/atoms/FlexBox";
import { FORM_DATA, INITIAL_VALUES } from "views/ApplicationForm/constants";
import SectionHeader from "components/molecules/SectionHeader";
import InputField from "components/molecules/InputField";
import { AddButton, DeleteButton } from "components/atoms/Buttons";

interface VehicleInfoProps {
  values: FORM_DATA;
  handleBlur: FormikHandlers["handleBlur"];
  handleChange: FormikHandlers["handleChange"];
}

const VehicleInfo = ({
  values: { vehicles },
  handleBlur,
  handleChange,
}: VehicleInfoProps) => (
  <FlexBox flexDirection="column" rowGap={2}>
    <SectionHeader title="Vehicles (up to 3)" />

    <FieldArray name="vehicles">
      {({ push, remove }) => (
        <>
          {vehicles.map(({ vin, year, make, model }, idx) => (
            <FlexBox key={idx} flexDirection="column" rowGap={2}>
              <FlexBox justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Vehicle #{idx + 1}</Typography>
                {vehicles.length > 1 && (
                  <DeleteButton remove={remove} idx={idx} />
                )}
              </FlexBox>

              <InputField
                name={`vehicles.${idx}.vin`}
                label="VIN"
                value={vin}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <FlexBox columnGap={1}>
                <InputField
                  name={`vehicles.${idx}.year`}
                  label="Year"
                  type="number"
                  value={year}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <InputField
                  name={`vehicles.${idx}.make`}
                  label="Make"
                  value={make}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <InputField
                  name={`vehicles.${idx}.model`}
                  label="Model"
                  value={model}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FlexBox>
            </FlexBox>
          ))}

          {vehicles.length < 3 && (
            <AddButton
              push={push}
              text="Add Vehicle"
              dataTemplate={INITIAL_VALUES.vehicles[0]}
            />
          )}
        </>
      )}
    </FieldArray>
  </FlexBox>
);

export default VehicleInfo;
