import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import { Quota } from "src/user";
import { FilledBar } from "./FilledBar";

type QuotaInfoProps = {
  quota: Quota;
};

export const QuotaInfo = ({
  quota: { pending, total, used, type, destinationCountry, product },
}: QuotaInfoProps) => {
  const title = `${destinationCountry} ${product}`;

  return (
    <Box key={title} paddingTop={4}>
      <Box paddingBottom={1}>
        <Text fontSize="sm" fontWeight="bold">
          {type}
        </Text>
      </Box>
      <Flex flexDirection="row">
        <Box width={"10%"}>
          <Text fontWeight="bold">{title}</Text>
        </Box>
        <Flex flexDirection="column" flexGrow={1} paddingX={2}>
          <Flex flexDirection="row">
            <Box paddingX={1}>{`${used}kg used`}</Box>
            {pending > 0 && (
              <Box
                style={{
                  paddingLeft: `${
                    (pending / total < 0.8 ? pending / total : 0.8) * 100
                  }%`,
                }}
              >{`${pending}kg pending`}</Box>
            )}
          </Flex>
          <FilledBar
            paddingX={1}
            height="12px"
            rounded
            backgroundColor={"#EBEBEB"}
            segments={[
              { color: "#00558B", percent: used / total },
              { color: "#9EE8FF", percent: pending / total },
            ]}
            type="stack"
          />
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="sm" fontWeight="bold">
            {`${total - used - pending}kg remaining`}
          </Text>
          <Text fontSize="sm">{`${total}kg total`}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
