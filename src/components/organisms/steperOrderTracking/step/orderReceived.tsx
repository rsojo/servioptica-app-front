import { BASE_COLORS } from "../../../../style/constants";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../../atoms";

export const OrderReceived = ({ actibe }: { actibe: boolean }) => {
  return (
    <ColumnAtom className="StepOrder_Box" alignItems="center" gap={2}>
      <GridAtom
        className="StepOrder"
        style={{
          background: actibe ? BASE_COLORS.blue : "#DEDEDE",
        }}
      >
        <svg width="45.003" height="45.102" viewBox="0 0 45.003 45.102">
          <g
            id="Grupo_117"
            data-name="Grupo 117"
            transform="translate(-320.3 -605.648)"
          >
            <path
              id="Icon_ionic-md-glasses"
              data-name="Icon ionic-md-glasses"
              d="M28.436,12.375H16.278v.006h-1.87v-.006H2.25v2.806h.643l.292,1.257c.935,3.945,2.367,5.29,5.611,5.29s5.611-1.017,5.611-5.29V15.181s.088-.935.935-.935.935.935.935.935v1.274c0,4.267,2.461,5.272,5.67,5.272s4.618-1.461,5.553-5.272l.292-1.274h.643V12.375Z"
              transform="translate(327.911 593.273)"
              fill={actibe ? "#dbe3ff" : "#ffffff"}
            />
            <path
              id="Icon_awesome-box-open"
              data-name="Icon awesome-box-open"
              d="M29.932,18a3.408,3.408,0,0,1-2.911-1.645L22.5,8.859l-4.514,7.5a3.42,3.42,0,0,1-2.918,1.652,3.234,3.234,0,0,1-.935-.134L4.5,15.117V27.633a2.243,2.243,0,0,0,1.7,2.18l15.2,3.8a4.571,4.571,0,0,0,2.18,0l15.216-3.8a2.255,2.255,0,0,0,1.7-2.18V15.117l-9.633,2.749A3.234,3.234,0,0,1,29.932,18ZM44.88,10.111,41.259,2.883a1.148,1.148,0,0,0-1.174-.626L22.5,4.5l6.448,10.695a1.156,1.156,0,0,0,1.3.513l13.915-3.973a1.158,1.158,0,0,0,.717-1.624ZM3.741,2.883.12,10.111a1.146,1.146,0,0,0,.71,1.617L14.745,15.7a1.156,1.156,0,0,0,1.3-.513L22.5,4.5,4.908,2.257a1.149,1.149,0,0,0-1.167.626Z"
              transform="translate(320.303 617.002)"
              fill={actibe ? "#dbe3ff" : "#ffffff"}
            />
          </g>
        </svg>
      </GridAtom>
      <GridAtom alignItems="center" gap={1}>
        <GridAtom style={{ maxWidth: 210, minHeight: 45 }}>
          <TitleAtom
            type="h3"
            style={{
              color: actibe ? BASE_COLORS.blue : "#DEDEDE",
              textAlign: "center",
              fontWeight: 900,
            }}
          >
            Pedido recibido
          </TitleAtom>
        </GridAtom>
        <GridAtom style={{ maxWidth: 200 }} gap={1}>
          <TextAtom
            style={{
              color: actibe ? BASE_COLORS.blue : "#707070",
              textAlign: "center",
              width: "100%",
            }}
          >
            01/09/2024
          </TextAtom>
          <TextAtom
            style={{
              color: BASE_COLORS.blue,
              textAlign: "center",
              width: "100%",
            }}
          >
            5:19 pm
          </TextAtom>
        </GridAtom>
      </GridAtom>
    </ColumnAtom>
  );
};
