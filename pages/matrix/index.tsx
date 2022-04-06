import type { NextPage } from "next";
import { Body } from "@ag.ds-next/body";
import { Content } from "@ag.ds-next/content";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { Heading } from "@ag.ds-next/heading";
import { Box, Flex } from "@ag.ds-next/box";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "@ag.ds-next/table";
import { Text } from "@ag.ds-next/text";
import { Button } from "@ag.ds-next/button";
import styled from "@emotion/styled";

const tableData: {
  headers: Array<{ title: string; callout: string; detail: string }>;
  body: Array<[string, string, string, string]>;
} = {
  headers: [
    {
      title: "Apply myself",
      callout: "Using the Export Service",
      detail:
        "Manage all permit and certificates applications myself through the Export Service",
    },

    {
      title: "Apply via a provider",
      callout: "Using third-party software or Export Agent",
      detail:
        "Manage all permits and certificates applications via third-party software or an Export Agent",
    },

    {
      title: "Apply myself, and/or use a provider",
      callout:
        "Have the choice of both doing it myself and using a third-party",
      detail:
        "Manage permits and certificates applications both myself and/or via third-party software or an Export Agent",
    },
  ],
  body: [
    [
      "Apply directly",
      "You can make and edit applications directly through the  Export Service.",
      "Access to applications is managed through your third-party software or Export Agent.",
      "You can make and edit applications directly through the Export Service.",
    ],
    [
      "Fees",
      "No access or account set-up costs.\n(Export application fees still apply)",
      "Costs associated with third-party software and/or agents.",
      "No access or account set-up costs for the Export Service. However, costs associated with third-party software and/or agents.",
    ],
    [
      "Access to other Department functions",
      "Other Department export actions available E.g. corrective action requests, quota allocations and importing country requirements.",
      "No access to other Department actions beyond permits and certificates.",
      "Other Department export actions available E.g. corrective action requests, quota allocations and importing country requirements.",
    ],
    [
      "Additional features to help with exporting",
      "Additional features to assist with exporting such as freight and logistics are not included in the Export Service.",
      "Possibility of additional paid-for features (e.g. freight and logistics) to assist with export processes beyond Department requirements.",
      "Possibility of additional paid-for features (a.g. freight and logistics) to assist with export processes beyond Department requirements.",
    ],
    [
      "Get help and support",
      "You can get help with software and systems directly through the Export Service.",
      "Help with software and systems is handled by your third party provider.",
      "Help with software and systems directly through the Export Service (for issues relating to the Export Service).",
    ],
    [
      "Data and security",
      "You will have direct visibility of your Department-related data via the Export Service. Access and security will be maintained by the Department.",
      "Access to your data will be through your third party provider. They are responsible for restricting or enabling access and maintaining data security.",
      "You will have direct visibility of your Department-related data via the Export Service. Access and security will be maintained by the Department.\nData not enabled via the Export Service will be maintained by your third-party provider.",
    ],
    [
      "Customised features",
      "No customised features (e.g. business reporting). ",
      "You may choose to purchase or develop customised features such as reporting tools in addition to your third party software package.",
      "You may choose to purchase or develop customised features such as reporting tools in addition to your third party software package.",
    ],
  ],
};

const CentreTextFlex = styled(Flex)(() => ({
  textAlign: "center",
}));

const BorderlessTableHead = styled(TableHead)(() => ({
  borderBottomWidth: 0,
  backgroundColor: "#aa00aa",
}));

const BordelessTableHeader = styled(TableHeader)(() => ({
  borderBottomWidth: "4px",
  borderBottomColor: "#fff",
}));

const BorderedTableHeader = styled(TableHeader)(() => ({
  borderBottomWidth: "4px",
  borderBottomColor: "#00558B",
}));

const BorderlessTableCell = styled(TableCell)(() => ({
  border: "none",
}));

const ParagraphBox = styled(Box)(() => ({
  marginTop: "1rem",
}));

const TextCentreBox = styled(Box)(() => ({
  textAlign: "center",
}));

const Matrix: NextPage = () => {
  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Content>
          <Body>
            <Heading as="h2" fontSize="xl">
              Options for applying for your export permits and certificates
            </Heading>
            <Box paddingY={4}>
              <Table>
                <BorderlessTableHead>
                  <tr>
                    <BordelessTableHeader
                      scope="col"
                      width="10%"
                    ></BordelessTableHeader>
                    {tableData.headers.map(({ callout, detail, title }) => (
                      <BorderedTableHeader scope="col" width="30%">
                        <CentreTextFlex
                          paddingX={1}
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Text
                            paddingBottom={2}
                            fontSize="lg"
                            fontWeight="bold"
                            color="action"
                          >
                            {title}
                          </Text>
                          <Text color="action" paddingBottom={2}>
                            {callout}
                          </Text>
                          <Text>{detail}</Text>
                        </CentreTextFlex>
                      </BorderedTableHeader>
                    ))}
                  </tr>
                </BorderlessTableHead>
                <TableBody>
                  {tableData.body.map((row) => (
                    <tr>
                      {row.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <BorderlessTableCell textAlign="left">
                            <Text color="action" fontWeight="bold">
                              {cell}
                            </Text>
                          </BorderlessTableCell>
                        ) : (
                          <TableCell textAlign="center">
                            <Box paddingX={2} paddingBottom={2}>
                              {cell.split("\n").map((line) => (
                                <ParagraphBox>
                                  <Text
                                    paddingTop={1}
                                    color="text"
                                    fontWeight="normal"
                                  >
                                    {line}
                                  </Text>
                                </ParagraphBox>
                              ))}
                            </Box>
                          </TableCell>
                        )
                      )}
                    </tr>
                  ))}
                  <tr>
                    <BorderlessTableCell></BorderlessTableCell>
                    <BorderlessTableCell>
                      <TextCentreBox>
                        <Button variant="secondary">Select</Button>
                      </TextCentreBox>
                    </BorderlessTableCell>
                    <BorderlessTableCell>
                      <TextCentreBox>
                        <Button variant="secondary">Select</Button>
                      </TextCentreBox>
                    </BorderlessTableCell>
                    <BorderlessTableCell>
                      <TextCentreBox>
                        <Button variant="secondary">Select</Button>
                      </TextCentreBox>
                    </BorderlessTableCell>
                  </tr>
                </TableBody>
              </Table>
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default Matrix;
