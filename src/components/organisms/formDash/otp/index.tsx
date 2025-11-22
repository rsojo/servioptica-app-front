import { useState } from "react";
import { BASE_COLORS } from "../../../../style/constants";
import ButtonAtom from "../../../atoms/button";
import GridAtom from "../../../atoms/grid";
import OTPInput from "../../../atoms/inputOTP";
import TextAtom from "../../../atoms/text";
import "./style.css";
import { sendOtp } from "../../../../api/Auth";
import { useMessage } from "../../../../hooks/useMessage";

export const OtpCodeLightBox = ({
  document: documentValue,
  onCallBack,
  onCancelBack,
}: {
  document: string;
  onCallBack: (value: string) => void;
  onCancelBack: () => void;
}) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const { errorSnackMessage, successSnackMessage } = useMessage();

  const handleReSendOtp = () => {
    sendOtp({ document: documentValue })
      .then((resp) => {
        setEmail(resp.data?.email || "");
        successSnackMessage(String(resp.message));
      })
      .catch((error) => errorSnackMessage(String(error)));
  };

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
          style={{ width: 55, minHeight: 55 }}
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
          El código de validación se envía al correo{" "}
          {email && <strong>{email}</strong>} y tiene una validez de 5 min
        </TextAtom>
        <GridAtom style={{ marginBottom: -105 }} alignItems="center" gap={1}>
          <ButtonAtom onClick={() => onCallBack(otp)}>Validar código</ButtonAtom>
          <ButtonAtom
            variant="outlined"
            adVariant="linkStyle"
            onClick={handleReSendOtp}
          >
            Enviar código nuevamente
          </ButtonAtom>
        </GridAtom>
      </GridAtom>
    </GridAtom>
  );
};
