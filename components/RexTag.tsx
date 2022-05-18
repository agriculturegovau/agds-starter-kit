import { Box } from "@ag.ds-next/box";
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

export const RexTag = (status: RexStatus) => {
  switch (status) {
    case "REVIEW":
      return () => (
        <>
          <TagBox paddingX={0.5}  paddingY={0.25} rounded color="action">
            In Review
          </TagBox>
        </>
      );
    case "DRAFT":
      return () => (
        <>
          <TagBox paddingX={0.5} paddingY={0.25} rounded color="muted">
            Draft
          </TagBox>
        </>
      );
    case "APPROVED":
      return () => (
        <>
          <TagBox paddingX={0.5} paddingY={0.25} rounded color="success">
            Approved
          </TagBox>
        </>
      );
  }
};
