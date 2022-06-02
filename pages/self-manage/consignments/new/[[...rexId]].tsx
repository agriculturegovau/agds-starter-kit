import { Body } from "@ag.ds-next/body";
import { Box, Flex } from "@ag.ds-next/box";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { DirectionLink } from "@ag.ds-next/direction-link";
import { Content } from "@ag.ds-next/content";
import { ControlGroup, Checkbox } from "@ag.ds-next/control-input";
import { Heading } from "@ag.ds-next/heading";
import {
  ProgressIndicator,
  ProgressIndicatorItem,
} from "@ag.ds-next/progress-indicator";
import { Select } from "@ag.ds-next/select";
import { Text } from "@ag.ds-next/text";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { CommodityTypes, Rex } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RexApiResponse } from "src/rexApplication";
import { CountryForm } from "@components/rexForm/Country";
import { IntroSplash } from "@components/rexForm/IntroSplash";
import { Button } from "@ag.ds-next/button";
import { CommodityForm } from "@components/rexForm/Commodity";

const formSegments: Array<{
  progressIndicator: ProgressIndicatorItem;
  requiredRexProp: keyof RexApiResponse;
}> = [
  {
    progressIndicator: { label: "Commodity", status: "todo" },
    requiredRexProp: "commodityType",
  },
  {
    progressIndicator: {
      label: "Dairy Options",
      status: "todo",
      disabled: true,
    },
    requiredRexProp: "dairyOptionsId",
  },
  {
    progressIndicator: { label: "Country", status: "todo", disabled: true },
    requiredRexProp: "countryId",
  },
  {
    progressIndicator: { label: "Products", status: "todo", disabled: true },
    requiredRexProp: "products",
  },
  {
    progressIndicator: { label: "Exporter", status: "todo", disabled: true },
    requiredRexProp: "consignee",
  },
  {
    progressIndicator: { label: "Consignee", status: "todo", disabled: true },
    requiredRexProp: "consignee",
  },
  {
    progressIndicator: {
      label: "Authorisation",
      status: "todo",
      disabled: true,
    },
    requiredRexProp: "clientRef",
  },
  {
    progressIndicator: {
      label: "Endorsements",
      status: "todo",
      disabled: true,
    },
    requiredRexProp: "certificateId",
  },
  {
    progressIndicator: { label: "SEW", status: "todo", disabled: true },
    requiredRexProp: "certificateId",
  },
  {
    progressIndicator: {
      label: "Additional details",
      status: "todo",
      disabled: true,
    },
    requiredRexProp: "certificateId",
  },
  {
    progressIndicator: { label: "Submit", status: "todo", disabled: true },
    requiredRexProp: "certificateId",
  },
];

const ConsignmentDetails = () => {
  const [isOnSplash, setIsOnSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(-1);
  const [currentRex, setCurrentRex] = useState<Partial<RexApiResponse>>({});
  const [formFlow, setFormFlow] = useState<ProgressIndicatorItem[]>([]);

  useEffect(() => {
    setFormFlow(calculateFormFlow(currentPage, currentRex, setCurrentPage));
  }, []);

  useEffect(() => {
    if (currentPage !== -1) {
      setFormFlow(calculateFormFlow(currentPage, currentRex, setCurrentPage));
    }
  }, [currentPage]);

  const subFormCommonProps = {
    currentRex,
    onComplete: (newRex: Partial<RexApiResponse>) => {
      console.log(newRex);
      setCurrentRex((oldRex) => (oldRex ? { ...oldRex, ...newRex } : newRex));
      setCurrentPage((oldPage) => oldPage + 1);
    },
  };

  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Content>
          <Body>
            <Breadcrumbs
              links={[
                { href: "/", label: "Home" },
                { href: "/self-manage", label: "Consignments" },
                { label: "Apply for export documentation" },
              ]}
            />
            <Box paddingY={2}>
              {isOnSplash ? (
                <>
                  <Heading as="h2" fontSize="xxl">
                    Apply for export documentation
                  </Heading>

                  <Box paddingY={4}>
                    <IntroSplash />
                  </Box>

                  <Box paddingTop={2}>
                    <Button
                      onClick={() => {
                        setIsOnSplash(false);
                        setCurrentPage(0);
                      }}
                    >
                      Start
                    </Button>
                  </Box>
                </>
              ) : (
                <Flex flexDirection="row">
                  <Box paddingRight={4}>
                    <ProgressIndicator items={formFlow} />
                  </Box>
                  <Box flexGrow={1}>
                    {currentPage !== 0 && (
                      <DirectionLink
                        direction="left"
                        onClick={() => {
                          setCurrentPage((orig) => orig - 1);
                        }}
                      >
                        Back
                      </DirectionLink>
                    )}
                    {currentPage === 0 && (
                      <CommodityForm {...subFormCommonProps} />
                    )}
                  </Box>
                </Flex>
              )}
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default ConsignmentDetails;

function calculateFormFlow(
  currentPage: number,
  currentRex: Partial<RexApiResponse>,
  setCurrentPage: Dispatch<SetStateAction<number>>
) {
  const newForm = formSegments
    .filter((item) => {
      return currentRex.commodityType === "DAIRY"
        ? true
        : item.progressIndicator.label !== "Dairy Options";
    })
    .map((page, index): ProgressIndicatorItem => {
      const rexValue = currentRex[page.requiredRexProp];
      return {
        ...page.progressIndicator,
        status: rexValue ? "done" : "todo",
        onClick: () => setCurrentPage(index),
      };
    });

  if (currentPage !== -1) {
    newForm[currentPage].status = "doing";
  }

  return newForm;
}
