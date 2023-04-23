import { Container, ContainerProps, Toolbar } from "@mui/material";
import FlexBox from "components/atoms/FlexBox";

const Page = ({ children, maxWidth = "md" }: ContainerProps) => {
  return (
    <Container maxWidth={maxWidth}>
      <Toolbar />
      <FlexBox flexDirection="column">{children}</FlexBox>
    </Container>
  );
};

export default Page;
