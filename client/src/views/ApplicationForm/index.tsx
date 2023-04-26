import { Card, CardContent, Typography } from "@mui/material";
import Page from "components/molecules/Page";
import FlexBox from "components/atoms/FlexBox";
import Form from "views/ApplicationForm/Form";
import SectionHeader from "components/molecules/SectionHeader";
import { useSearchParams } from "react-router-dom";

const ApplicationForm = () => {
  const [searchParams] = useSearchParams();
  const applicationRef = searchParams.get("ref");

  return (
    <Page>
      <Card>
        <CardContent>
          <FlexBox flexDirection="column" rowGap={5}>
            {applicationRef ? (
              <>
                <SectionHeader
                  title="Welcome!"
                  titleVariant="h3"
                  subtitle="To complete your quote, please enter and verify your information into the form below."
                  subtitleVariant="h5"
                  hideDivider
                />
                <Form applicationRef={applicationRef} />
              </>
            ) : (
              <Typography variant="h5">
                There was an issue retrieving your information, please use the
                link you were provided to proceed
              </Typography>
            )}
          </FlexBox>
        </CardContent>
      </Card>
    </Page>
  );
};

export default ApplicationForm;
