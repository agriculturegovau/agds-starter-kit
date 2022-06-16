import { Body } from "@ag.ds-next/body";
import { Box, Flex } from "@ag.ds-next/box";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { DirectionLink } from "@ag.ds-next/direction-link";
import { Content } from "@ag.ds-next/content";
import { Heading } from "@ag.ds-next/heading";
import {
  ProgressIndicator,
  ProgressIndicatorItem,
} from "@ag.ds-next/progress-indicator";
import { Text } from "@ag.ds-next/text";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { CommodityTypes, Rex } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RexApiResponse } from "src/rexApplication";
import { CountryForm } from "@components/rexForm/Country";
import { IntroSplash } from "@components/rexForm/IntroSplash";
import { Button } from "@ag.ds-next/button";
import { CommodityForm } from "@components/rexForm/Commodity";
import { DairyOptionsForm } from "@components/rexForm/DairyOptions";
import { ProductForm } from "@components/rexForm/Products";
import { useRouter } from "next/router";

const formSegments: Array<{
  progressIndicator: ProgressIndicatorItem;
  checkStepIsComplete: (rex: Partial<RexApiResponse>) => boolean;
}> = [
  {
    progressIndicator: { label: "Commodity", status: "todo" },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) =>
      rex.commodityType !== undefined,
  },
  {
    progressIndicator: {
      label: "Dairy Options",
      status: "todo",
      disabled: true,
    },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) =>
      rex.dairyOptions !== undefined,
  },
  {
    progressIndicator: { label: "Country", status: "todo", disabled: true },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) =>
      rex.countryId !== undefined,
  },
  {
    progressIndicator: { label: "Products", status: "todo", disabled: true },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) =>
      rex.products && rex.products.length > 0 ? true : false,
  },
  {
    progressIndicator: { label: "Exporter", status: "todo", disabled: true },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
  {
    progressIndicator: { label: "Consignee", status: "todo", disabled: true },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
  {
    progressIndicator: {
      label: "Authorisation",
      status: "todo",
      disabled: true,
    },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
  {
    progressIndicator: {
      label: "Endorsements",
      status: "todo",
      disabled: true,
    },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
  {
    progressIndicator: { label: "SEW", status: "todo", disabled: true },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
  {
    progressIndicator: {
      label: "Additional details",
      status: "todo",
      disabled: true,
    },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
  {
    progressIndicator: { label: "Submit", status: "todo", disabled: true },
    checkStepIsComplete: (rex: Partial<RexApiResponse>) => false,
  },
];

const ConsignmentDetails = () => {
  const [isOnSplash, setIsOnSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(-1);
  const [currentRex, setCurrentRex] = useState<Partial<RexApiResponse>>({});
  const [formFlow, setFormFlow] = useState<ProgressIndicatorItem[]>([]);
  const [availablePages, setAvailablePages] = useState<number[]>([0]);

  const router = useRouter();

  useEffect(() => {
    setFormFlow(
      calculateFormFlow(availablePages, currentPage, currentRex, setCurrentPage)
    );
  }, []);

  useEffect(() => {
    if (currentPage !== -1) {
      setAvailablePages((current) =>
        current.includes(currentPage) ? current : [...current, currentPage]
      );
      setFormFlow(
        calculateFormFlow(
          availablePages,
          currentPage,
          currentRex,
          setCurrentPage
        )
      );
    }
  }, [currentPage]);

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
                    {getSubForm(
                      currentPage,
                      currentRex,
                      (newRex: Partial<RexApiResponse>) => {
                        setCurrentRex((oldRex) =>
                          oldRex ? { ...oldRex, ...newRex } : newRex
                        );
                        setCurrentPage((oldPage) => oldPage + 1);
                      },
                      (newRex: Partial<RexApiResponse>) => {
                        setCurrentRex((oldRex) =>
                          oldRex ? { ...oldRex, ...newRex } : newRex
                        );
                      },
                      () => {
                        router.push('/self-manage');
                      }
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

const noOp = () => {};

const getSubForm = (
  currentPage: number,
  currentRex: Partial<RexApiResponse>,
  onComplete: (newRex: Partial<RexApiResponse>) => void,
  onUpdate: (newRex: Partial<RexApiResponse>) => void,
  onExit: () => void
) => {
  const realPage =
    currentPage > 0 && currentRex.commodityType !== CommodityTypes.DAIRY
      ? currentPage + 1
      : currentPage;

  switch (realPage) {
    case 0:
      return (
        <CommodityForm
          currentRex={currentRex}
          onComplete={onComplete}
          onUpdate={onUpdate}
          onExit={noOp} //Because the REX isn't created yet, we don't want to exit the form
        />
      );
    case 1:
      return (
        <DairyOptionsForm
          currentRex={currentRex}
          onComplete={onComplete}
          onUpdate={onUpdate}
          onExit={noOp}
        />
      );
    case 2:
      return (
        <CountryForm
          currentRex={currentRex}
          onComplete={onComplete}
          onUpdate={onUpdate}
          onExit={noOp}
        />
      );
    case 3:
      return (
        <ProductForm
          currentRex={currentRex}
          onComplete={onComplete}
          onUpdate={onUpdate}
          onExit={onExit}
        />
      );
    // case 4:
    //   return <ExporterForm currentRex={currentRex} onComplete={onComplete}
    // onUpdate={onUpdate} />;
    // case 5:
    //   return <ConsigneeForm currentRex={currentRex} onComplete={onComplete}
    // onUpdate={onUpdate} />;
    // case 6:
    //   return (
    //     <AuthorisationForm currentRex={currentRex} onComplete={onComplete}
    // onUpdate={onUpdate} />
    //   );
    // case 7:
    //   return (
    //     <EndorsementsForm currentRex={currentRex} onComplete={onComplete}
    // onUpdate={onUpdate} />
    //   );
    // case 8:
    //   return <SEWForm currentRex={currentRex} onComplete={onComplete} />;
    // case 9:
    //   return (
    //     <AdditionalDetailsForm
    //       currentRex={currentRex}
    //       onComplete={onComplete}
    // onUpdate={onUpdate}
    //     />
    //   );
    // case 10:
    //   return <SubmitForm currentRex={currentRex} onComplete={onComplete}
    // onUpdate={onUpdate} />;
    default:
      return (
        <Box>
          <Text>TBD</Text>
        </Box>
      );
  }
};

function calculateFormFlow(
  availablePages: number[],
  currentPage: number,
  currentRex: Partial<RexApiResponse>,
  setCurrentPage: Dispatch<SetStateAction<number>>
): ProgressIndicatorItem[] {
  const newForm = formSegments
    .filter((item) => {
      return currentRex.commodityType === "DAIRY"
        ? true
        : item.progressIndicator.label !== "Dairy Options";
    })
    .map((page, index): ProgressIndicatorItem => {
      const ap = !availablePages.includes(index);
      return {
        ...page.progressIndicator,
        status: page.checkStepIsComplete(currentRex) ? "done" : "todo",
        // @ts-ignore
        disabled: ap,
        onClick: () => setCurrentPage(index),
      };
    });

  if (currentPage !== -1) {
    newForm[currentPage].status = "doing";
  }

  return newForm;
}
