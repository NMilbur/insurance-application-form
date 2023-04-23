import { Divider, Typography, TypographyVariant } from "@mui/material";
import FlexBox from "components/atoms/FlexBox";

interface SectionHeaderProps {
  title: string;
  titleVariant?: TypographyVariant;
  subtitle?: string;
  subtitleVariant?: TypographyVariant;
  hideDivider?: boolean;
}

const SectionHeader = ({
  title,
  titleVariant = "h4",
  subtitle,
  subtitleVariant = "h4",
  hideDivider = false,
}: SectionHeaderProps) => (
  <FlexBox flexDirection="column" rowGap={1}>
    <Typography variant={titleVariant}>{title}</Typography>
    {subtitle && <Typography variant={subtitleVariant}>{subtitle}</Typography>}
    {!hideDivider && <Divider />}
  </FlexBox>
);

export default SectionHeader;
