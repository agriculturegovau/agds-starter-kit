import { Flex, Box } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import {
  ProgressDoneIcon,
  ProgressDoingIcon,
  ProgressTodoIcon,
  IconProps,
} from "@ag.ds-next/icon";
import { ProgressItem } from "./FlowProgress";

type FlowProgressSectionProps = {
  progressItem: ProgressItem;
  last: boolean;
};

const iconProps: Pick<IconProps, "style" | "color" | "weight"> = {
  style: {
    backgroundColor: "white",
  },
  weight: "bold",
};

export const FlowProgressSection = ({
  last,
  progressItem,
}: FlowProgressSectionProps) => {
  return (
    <Flex paddingY={1}>
      <Flex flexDirection="column" paddingRight={2}>
        <Box style={{ zIndex: "500" }}>
          {progressItem.status === "done" && (
            <ProgressDoneIcon {...iconProps} color="action" />
          )}
          {progressItem.status === "doing" && (
            <ProgressDoingIcon {...iconProps} color="action" />
          )}
          {progressItem.status === "todo" && (
            <ProgressTodoIcon {...iconProps} color="muted" />
          )}
        </Box>
        {!last && (
          <Box width="100%" height="100%">
            <Box
              width="4px"
              height="calc(100% + 60px)"
              style={{
                position: "relative",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor:
                  progressItem.status === "todo" ? "#626262" : "#00558B",
                top: "-20px",
              }}
            ></Box>
          </Box>
        )}
      </Flex>
      <Flex flexDirection="column">
        <Text fontSize="sm" fontWeight="bold">
          {progressItem.title}
        </Text>

        {progressItem.detail && (
          <Text fontSize="sm">{progressItem.detail}</Text>
        )}
      </Flex>
    </Flex>
  );
};
