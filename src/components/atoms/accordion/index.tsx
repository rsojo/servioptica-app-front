import { Add } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";

type AccordionAtomType = {
  data: { id: string; header: React.ReactNode; content: React.ReactNode };
  initialExpanded: boolean;
  expandIcon: React.ReactNode;
  style?: React.CSSProperties;
  onCallBack: () => void;
};

export const AccordionAtom = ({
  data,
  initialExpanded,
  expandIcon,
  style,
  onCallBack,
}: AccordionAtomType) => {
  const [expanded, setExpanded] = useState(initialExpanded);

  useEffect(() => {
    setExpanded(initialExpanded);
  }, [initialExpanded]);

  const renderItemsAccordion = () => {
    return (
      <Accordion
        style={style}
        key={data.id}
        className="accordionAtom"
        expanded={expanded}
        onChange={onCallBack}
      >
        <AccordionSummary
          expandIcon={expandIcon ?? <Add />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {data.header}
        </AccordionSummary>
        <AccordionDetails>{data.content}</AccordionDetails>
      </Accordion>
    );
  };

  return <>{renderItemsAccordion()}</>;
};

export default AccordionAtom;
