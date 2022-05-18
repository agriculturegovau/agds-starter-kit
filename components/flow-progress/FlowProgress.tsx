import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import {
  ProgressDoneIcon,
  ProgressTodoIcon,
  ProgressDoingIcon,
} from "@ag.ds-next/icon";
import { ProgressIndicatorItemStatus } from "@ag.ds-next/progress-indicator";
import { FlowProgressSection } from "./FlowProgressSection";

export type ProgressItem = {
  title: string;
  status: ProgressIndicatorItemStatus;
  detail?: string;
};

type FlowProgressProps = {
  progressItems: Array<ProgressItem>;
};

export const FlowProgress = ({ progressItems }: FlowProgressProps) => {
  return (
    <Box>
      {progressItems.map((progressItem, i) => (
        <FlowProgressSection
          key={progressItem.title}
          progressItem={progressItem}
          last={i === progressItems.length - 1}
        />
      ))}
    </Box>
  );
};
