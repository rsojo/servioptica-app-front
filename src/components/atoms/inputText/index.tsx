/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from "@mui/material";
import {
  HTMLInputTypeAttribute,
  ReactElement,
  useEffect,
  useState,
} from "react";
import "./style.css";
import { FieldsStructure } from "../../molecules/form/type";
import { validateField } from "../../molecules/form/lib/validateFields";

export type InputAtomProps = {
  field: Partial<FieldsStructure>;
  cleanValue?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  onChangeCallback: (value: string | number) => void | undefined;
  erroForm?: boolean;
  defaultValue?: any;
  style?: React.CSSProperties;
  multiline?: boolean;
  rows?: number;
  variant?: "main" | "ghost";
};
export const InputTextAtom = ({
  field,
  type,
  cleanValue,
  disabled,
  onChangeCallback,
  erroForm,
  defaultValue,
  style,
  multiline,
  variant,
}: InputAtomProps): ReactElement => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");
  const [helperText, setHelperText] = useState("");
  const { name, placeholder, maxlength, important, id } = field;

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  useEffect(() => {
    important && erroForm ? setError(true) : setError(false);
    if (cleanValue) {
      setValue("");
    }
  }, [erroForm, cleanValue]);

  const validationAction = async (value: string | number) => {
    setValue(value);
    const validateError = await validateField({
      field,
      value,
    });
    if (validateError) {
      setError(true);
      setHelperText(validateError.errorMessage);
    } else {
      setHelperText("");
      setError(false);
    }
    // important && value == "" ? setError(true) : setError(false);
    onChangeCallback(value);
  };

  return (
    <TextField
      style={style}
      className={`customTextField ${multiline ? "TextArea" : ""} ${
        variant ?? "main"
      }`}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={multiline && variant !== "ghost" ? 4 : undefined}
      type={type ?? "text"}
      id={id?.toString() ?? ""}
      name={name ?? ""}
      onChange={(e) => {
        if (e.target.value.length <= (maxlength ?? 60)) {
          setValue(e.target.value);
          validationAction(e.target.value);
        }
      }}
      value={value}
      disabled={disabled ?? false}
      placeholder={placeholder ?? ""}
    />
  );
};

export default InputTextAtom;
