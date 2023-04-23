import { Card, CardContent } from "@mui/material";
import Page from "components/molecules/Page";
import FlexBox from "components/atoms/FlexBox";
import Form from "./Form";
import SectionHeader from "components/molecules/SectionHeader";

const ApplicationForm = () => {
  return (
    <Page>
      <Card>
        <CardContent>
          <FlexBox flexDirection="column" rowGap={5}>
            <SectionHeader
              title="Welcome!"
              titleVariant="h3"
              subtitle="To start your quote, please enter your information into the form below."
              subtitleVariant="h5"
              hideDivider
            />

            <Form />
          </FlexBox>
        </CardContent>
      </Card>
    </Page>
  );
};

export default ApplicationForm;
