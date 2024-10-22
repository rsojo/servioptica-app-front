/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
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
import { getFaqActives } from "../../api/Faq";
import { CircularProgress } from "@mui/material";

export const Faq = () => {
  const [loading, setLoading] = useState(false);
  const [cuttentActive, setCuttentActive] = useState(0);
  const [faqsData, setFaqsData] = useState<Array<{
    id: string;
    header: JSX.Element;
    content: JSX.Element;
  }> | null>(null);

  // Ref para controlar que solo se haga la petición una vez
  const hasFetchedFaqs = useRef(false);

  const fetchFaqsData = async () => {
    try {
      if (!faqsData && !loading) {
        setLoading(true);
        const response = await getFaqActives();
        const formatingData = response.data.map((item) => ({
          id: String(item.id),
          header: (
            <TitleAtom
              type="h2"
              style={{
                padding: "24px 16px",
                color: BASE_COLORS.blue,
                fontWeight: 900,
              }}
            >
              {item.question}
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
              {item.answer}
            </TextAtom>
          ),
        }));
        setFaqsData(formatingData);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedFaqs.current && !loading) {
      hasFetchedFaqs.current = true;
      fetchFaqsData();
    }
  }, [loading]);

  return (
    <ContainerAtom
      style={{
        maxWidth: 1440,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GridAtom gap={4}>
        <Row gap={5} alignItems="center" style={{ padding: "0px 32px" }}>
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
      {loading && (
        <GridAtom p={5} style={{minHeight: 320}} justifyContent="center" alignItems="center">
          <CircularProgress />
        </GridAtom>
      )}
      {!!faqsData && (
        <GridAtom style={{ padding: "32px 64px" }}>
          {faqsData.map((item, index) => {
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
      )}
    </ContainerAtom>
  );
};
