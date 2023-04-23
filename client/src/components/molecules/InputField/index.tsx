import { TextField, TextFieldProps } from "@mui/material";
import FlexBox from "components/atoms/FlexBox";
import { ErrorMessage } from "formik";

const InputField = ({
  name = "default",
  label,
  type = "text",
  value,
  ...rest
}: TextFieldProps) => (
  <FlexBox flexDirection="column" rowGap={1} width="100%">
    <TextField
      name={name}
      label={label}
      type={type}
      variant="outlined"
      value={value}
      fullWidth
      {...rest}
    />
    <ErrorMessage name={name} component="div" className="field-error" />
  </FlexBox>
);

export default InputField;
