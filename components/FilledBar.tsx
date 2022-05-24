import { Box, BoxProps } from "@ag.ds-next/box";
import { useElementSize } from "@ag.ds-next/core";
import { useEffect, useRef, useState } from "react";

type barSegment = {
  percent: number;
  color: string;
};

type FilledBarProps = BoxProps & {
  height: string;
  backgroundColor: string;
  type: "stack" | "overlap";
  segments: Array<barSegment>;
};

const InnerBar = ({
  rounded,
  ...props
}: {
  backgroundColor: string;
  height: string;
  width: string;
  rounded?: boolean;
}) => (
  <Box
    key={props.backgroundColor}
    rounded={rounded}
    style={{
      position: "absolute",
      ...props,
    }}
  />
);

export const FilledBar = ({
  backgroundColor,
  height,
  segments,
  type,
  ...rest
}: FilledBarProps) => {
  const { rounded } = rest;
  const ref = useRef<HTMLDivElement>(null);
  const { width: parentWidth } = useElementSize(ref);

  const [innerBars, setInnerBars] = useState<Array<barSegment>>([]);

  useEffect(() => {
    if (type === "overlap") {
      setInnerBars(segments.sort((a, b) => b.percent - a.percent));
    } else {
      const modBars = segments
        .filter((bar) => {
          return bar.percent > 0;
        })
        .map((bar, index) => {
          const newBar = { ...bar };
          newBar.percent = segments.reduce((pv, cv, i) => {
            if (i <= index) {
              return pv + cv.percent;
            }
            return pv;
          }, 0);
          return newBar;
        });

      setInnerBars(modBars.sort((a, b) => b.percent - a.percent));
    }
  }, [segments, type]);

  return (
    <Box width="100%" {...rest}>
      <Box
        ref={ref}
        width="100%"
        style={{ backgroundColor, height }}
        rounded={rounded}
      >
        {innerBars.map(({ percent, color }) => {
          const width = parentWidth * percent * (percent > 1 ? 0.001 : 1);
          return (
            <InnerBar
              key={color}
              rounded={rounded}
              backgroundColor={color}
              height={height}
              width={`${width}px`}
            />
          );
        })}
      </Box>
    </Box>
  );
};
