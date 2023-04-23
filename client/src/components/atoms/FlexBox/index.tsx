import { Box, BoxProps } from "@mui/material";

const FlexBox = ({ children, ...rest }: BoxProps) => (
  <Box display="flex" {...rest}>
    {children}
  </Box>
);

export default FlexBox;
