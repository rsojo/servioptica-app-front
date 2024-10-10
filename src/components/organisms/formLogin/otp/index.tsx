import { useState } from "react";
import { BASE_COLORS } from "../../../../style/constants";
import ButtonAtom from "../../../atoms/button";
import GridAtom from "../../../atoms/grid";
import OTPInput from "../../../atoms/inputOTP";
import TextAtom from "../../../atoms/text";
import "./style.css";

export const OtpCodeLightBox = ({
  onCallBack,
  onCancelBack,
}: {
  onCallBack: (value: string) => void;
  onCancelBack: () => void;
}) => {
  const [otp, setOtp] = useState("");
  return (
    <GridAtom className="OtpCodeLightBox">
      <GridAtom
        className="OtpCodeLightBox_Card"
        alignItems="center"
        gap={4}
        style={{ position: "relative" }}
      >
        <ButtonAtom
          adVariant="ghostStyle"
          className="CloseIconBox"
          onClick={onCancelBack}
        >
          <span className="CloseIcon"></span>
        </ButtonAtom>
        <OTPInput onChange={setOtp} />
        <TextAtom
          style={{
            textAlign: "center",
            maxWidth: 600,
            color: BASE_COLORS.blue,
          }}
        >
          El código de validación se envía al correo registrado en nuestra
          plataforma se*****g**@tx**co y tiene un valides de 5 min.
        </TextAtom>
        <GridAtom style={{ marginBottom: -70 }} alignItems="center" gap={1}>
          <ButtonAtom onClick={() => onCallBack(otp)}>
            Validar código
          </ButtonAtom>
          <ButtonAtom
            variant="outlined"
            adVariant="linkStyle"
            onClick={() => onCallBack(otp)}
          >
            Enviar código nuevamente
          </ButtonAtom>
        </GridAtom>
      </GridAtom>
    </GridAtom>
  );
};
