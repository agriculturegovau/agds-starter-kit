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
import { useEffect, useState } from "react";
import { RexApiResponse } from "src/rexApplication";
import { CountryForm } from "@components/rexForm/country";

const pages = [
  "Country",
  "Products",
  "Exporter",
  "Consignee",
  "Authorisation",
  "Endorsements",
  "SEW",
  "Additional details",
  "Submit",
];

const ConsignmentDetails = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRex, setCurrentRex] = useState<RexApiResponse>();
  const [formFlow, setFormFlow] = useState<ProgressIndicatorItem[]>([]);

  useEffect(() => {
    setFormFlow(
      pages.map(
        (page, index): ProgressIndicatorItem => ({
          label: page,
          status: "todo",
          onClick: () => setCurrentPage(index),
        })
      )
    );
  }, []);

  useEffect(() => {
    axios.get<RexApiResponse>("/api/rex/3").then((res) => {
      const { data } = res;
      console.log(data);
      setCurrentRex(data);
      //TODO: check contents of REX to set ProgressIndicator status
    });
  }, []);

  useEffect(() => {
    setFormFlow((currentState) => {
      const newState = [...currentState];
      newState[currentPage].status = "doing";
      return newState;
    });
  }, [currentPage]);

  const nextPage = () => {
    setFormFlow((currentState) => {
      const newState = [...currentState];
      newState[currentPage].status = "done";
      return newState;
    });
    setCurrentPage(currentPage + 1);
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
              <Flex flexDirection="row">
                <Box paddingRight={4}>
                  <ProgressIndicator items={formFlow} />
                </Box>
                <Box flexGrow={1}>
                  <DirectionLink direction="left">Back</DirectionLink>
                  <CountryForm nextPage={nextPage} rexId={3} />
                </Box>
              </Flex>
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default ConsignmentDetails;
