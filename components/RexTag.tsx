import { Box, BoxProps } from "@ag.ds-next/box";
import styled from "@emotion/styled";
import { RexStatus } from "src/rex";

const TagBox = styled(Box)(({ color }) => {
  const finalColor = color === "muted" ? "#61696B" : "#0B996C";

  return {
    textAlign: "center",
    border: "1px solid",
    borderColor: finalColor,
    color: color === "success" ? "#fff" : finalColor,
    backgroundColor: color === "success" ? finalColor : "#fff",
  };
});

const commonTagProps: Pick<BoxProps, "paddingX" | "paddingY"> = {
  paddingX: 0.5,
  paddingY: 0.25,
};

const ReviewTag = () => (
  <TagBox {...commonTagProps} rounded color="action">
    In Review
  </TagBox>
);

const DraftTag = () => (
  <TagBox {...commonTagProps} rounded color="muted">
    Draft
  </TagBox>
);

const ApprovedTag = () => (
  <TagBox {...commonTagProps} rounded color="success">
    Approved
  </TagBox>
);

export const RexTag = (status: RexStatus) => {
  switch (status) {
    case "REVIEW":
      return ReviewTag;
    case "DRAFT":
      return DraftTag;
    case "APPROVED":
      return ApprovedTag;
  }
};
