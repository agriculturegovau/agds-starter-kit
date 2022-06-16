import { Flex, Box } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";

type NextAndExitProps = {
  onNextClick: () => void;
  onExitClick: () => void;
  nextEnabled?: boolean;
  exitEnabled?: boolean;
};

export const NextAndExit = ({
  onExitClick,
  onNextClick,
  exitEnabled,
  nextEnabled,
}: NextAndExitProps) => {
  return (
    <Flex>
      <Box paddingRight={1}>
        <Button
          onClick={() => {
            onNextClick();
          }}
          disabled={nextEnabled}
        >
          Next
        </Button>
      </Box>
      <Box>
        <Button
          variant="secondary"
          onClick={() => {
            onExitClick();
          }}
          disabled={exitEnabled}
        >
          Save and Exit
        </Button>
      </Box>
    </Flex>
  );
};
