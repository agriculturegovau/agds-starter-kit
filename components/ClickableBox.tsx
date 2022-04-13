import { BoxProps } from "@ag.ds-next/box";
import { Button, ButtonProps } from "@ag.ds-next/button";
import {
  ResponsiveProp,
  Spacing,
  mapResponsiveProp,
  mapSpacing,
  mq,
} from "@ag.ds-next/core";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const UnstyledButton = styled(Button)(() => ({
  textAlign: "left",
  textDecoration: "none",
  width: "100%",
  height: "100%",
  padding: 0,
}));

type ClickableBoxProps = ButtonProps &
  Pick<
    BoxProps,
    | "padding"
    | "paddingBottom"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingX"
    | "paddingY"
  >;

type PaddingProps = Partial<{
  paddingTop: ResponsiveProp<Spacing>;
  paddingBottom: ResponsiveProp<Spacing>;
  paddingRight: ResponsiveProp<Spacing>;
  paddingLeft: ResponsiveProp<Spacing>;
  paddingX: ResponsiveProp<Spacing>;
  paddingY: ResponsiveProp<Spacing>;
  padding: ResponsiveProp<Spacing>;
}>;

function paddingStyles({
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  paddingX,
  paddingY,
  padding,
}: PaddingProps) {
  return {
    paddingTop: `${paddingTop ?? paddingY ?? padding}em`,
    paddingBottom: `${paddingBottom ?? paddingY ?? padding}em`,
    paddingRight: `${paddingRight ?? paddingX ?? padding}em`,
    paddingLeft: `${paddingLeft ?? paddingX ?? padding}em`,
  };
}

export const ClickableBox = ({
  children,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
  ...rest
}: ClickableBoxProps) => {
  return (
    <UnstyledButton
      {...rest}
      style={{
        ...paddingStyles({
          padding,
          paddingBottom,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingX,
          paddingY,
        }),
      }}
      variant="tertiary"
    >
      {children}
    </UnstyledButton>
  );
};
