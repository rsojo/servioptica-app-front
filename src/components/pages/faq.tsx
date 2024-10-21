import { useState } from "react";
import {
  AccordionAtom,
  ContainerAtom,
  GridAtom,
  TextAtom,
  TitleAtom,
} from "../atoms";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BASE_COLORS } from "../../style/constants";
import Row from "../atoms/row";

export const Faq = () => {
  const testData = [
    {
      id: "1",
      header: (
        <TitleAtom
          type="h2"
          style={{ padding: '24px 16px', color: BASE_COLORS.blue, fontWeight: 900 }}
        >
          Título 1
        </TitleAtom>
      ),
      content: (
        <TextAtom
          style={{
            padding: 8,
            paddingLeft: 44,
            paddingBottom: 24,
            color: BASE_COLORS.blue,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
          eleifend erat, eu posuere magna. Morbi justo urna, dignissim sit amet
          suscipit a, euismod sed orci. Phasellus dapibus erat vel ex ultrices
          tempus. Donec pretium, dolor id pellentesque luctus, massa elit mollis
          dolor, vitae consequat ipsum mauris vitae sem.
        </TextAtom>
      ),
    },
    {
      id: "2",
      header: (
        <TitleAtom
          type="h2"
          style={{ padding: '24px 16px', color: BASE_COLORS.blue, fontWeight: 900 }}
        >
          Título 2
        </TitleAtom>
      ),
      content: (
        <TextAtom
          style={{
            padding: 8,
            paddingLeft: 40,
            paddingBottom: 24,
            color: BASE_COLORS.blue,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
          eleifend erat, eu posuere magna. Morbi justo urna, dignissim sit amet
          suscipit a, euismod sed orci. Phasellus dapibus erat vel ex ultrices
          tempus. Donec pretium, dolor id pellentesque luctus, massa elit mollis
          dolor, vitae consequat ipsum mauris vitae sem.
        </TextAtom>
      ),
    },
  ];

  const [cuttentActive, setCuttentActive] = useState(0);

  return (
    <ContainerAtom
      style={{
        maxWidth: 1440,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GridAtom gap={4}>
        <Row gap={5} alignItems="center" style={{padding: '0px 32px'}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31.5"
            height="11.25"
            viewBox="0 0 31.5 11.25"
          >
            <path
              id="Icon_ionic-md-glasses"
              data-name="Icon ionic-md-glasses"
              d="M33.75,12.375H19.125v.007h-2.25v-.007H2.25V15.75h.773l.352,1.512c1.125,4.746,2.848,6.363,6.75,6.363s6.75-1.223,6.75-6.363V15.75S16.98,14.625,18,14.625s1.125,1.125,1.125,1.125v1.533c0,5.133,2.96,6.342,6.82,6.342s5.555-1.758,6.68-6.342l.352-1.533h.773V12.375Z"
              transform="translate(-2.25 -12.375)"
              fill="#024f8f"
            />
          </svg>

          <TitleAtom style={{ color: BASE_COLORS.blue, fontWeight: 900 }}>
            FAQ
          </TitleAtom>
        </Row>
        <GridAtom style={{ width: "100%", border: "1px solid #707070" }} />
      </GridAtom>
      <GridAtom style={{padding: '32px 64px'}}>
        {testData.map((item, index) => {
          return (
            <AccordionAtom
              key={index + 1}
              expandIcon={
                index === cuttentActive ? (
                  <RemoveIcon
                    style={{
                      fill: BASE_COLORS.blue,
                    }}
                  />
                ) : (
                  <AddIcon
                    style={{
                      fill: BASE_COLORS.blue,
                    }}
                  />
                )
              }
              initialExpanded={index === cuttentActive}
              data={item}
              onCallBack={() => setCuttentActive(index)}
            />
          );
        })}
      </GridAtom>
    </ContainerAtom>
  );
};
