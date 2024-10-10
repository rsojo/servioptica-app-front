/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";

export type InputRadioAtomType = {
  id?: string;
  name: string;
  options: Array<{ option: string; value: string }>;
  erroForm?: boolean;
  disabled?: boolean;
  important?: boolean;
  cleanValue?: boolean;
  defaultValue?: string;
  onChangeCallback: (value: string) => void | undefined;
};

const InputRadioAtom = ({
  id,
  name,
  options,
  erroForm,
  disabled,
  important,
  cleanValue,
  defaultValue,
  onChangeCallback,
}: InputRadioAtomType) => {
  const [defaultSelection, setDefaultSelection] = useState(
    defaultValue
      ? options.find((option) => option.value === defaultValue)?.value
      : ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    setDefaultSelection(event.target.value);
    onChangeCallback(event.target.value);
  };

  useEffect(() => {
    setDefaultSelection(
      defaultValue
        ? options.find((option) => option.value === defaultValue)?.value
        : ""
    );
  }, [defaultValue]);

  useEffect(() => {
    if (cleanValue) {
      setDefaultSelection(
        defaultValue
          ? options.find((option) => option.value === defaultValue)?.value
          : ""
      );
    }
  }, [cleanValue]);

  const CustomFormControlLabel = styled(FormControlLabel)({
    margin: 0,
    "& .PrivateSwitchBase-input + span": {
      border: erroForm && important ? "1px solid #ff3d3d" : "1px solid #A3ABB0",
      background: "#fff",
      justifyContent: "center",
      position: "relative",
      alignItems: "center",
      borderRadius: 50,
      display: "flex",
      height: 16,
      width: 16,
    },

    '& .PrivateSwitchBase-input + span > svg[data-testid="RadioButtonUncheckedIcon"]':
      {
        display: "none",
      },

    '& .PrivateSwitchBase-input + span > svg[data-testid="RadioButtonCheckedIcon"]':
      {
        position: "absolute",
        fill: "#67CEF9",
        left: "auto",
        width: 16,
        height: 16,
      },
    "& .Mui-checked .PrivateSwitchBase-input + span": {
      border: "1px solid #67CEF9",
    },
  });
  return (
    <RadioGroup
      value={defaultSelection}
      name={name}
      id={id ?? ""}
      onChange={handleChange}
    >
      {options.map((item) => (
        <CustomFormControlLabel
          key={item.value}
          disabled={disabled}
          value={item.value}
          control={<Radio />}
          label={item.option}
        />
      ))}
    </RadioGroup>
  );
};

export default InputRadioAtom;
