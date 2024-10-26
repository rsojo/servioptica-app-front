/* eslint-disable react-hooks/exhaustive-deps */
// import { TextField } from "@mui/material";
import {
  HTMLInputTypeAttribute,
  ReactElement,
  useEffect,
  useState,
} from "react";
import "./style.css";
import { FieldsStructure } from "../../molecules/form/type";
// import { validateField } from "../../molecules/form/lib/validateFields";
import { MuiFileInput } from "mui-file-input";
import ClearIcon from '@mui/icons-material/Clear';

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
  variant?: "main" | "ghost" | "small";
};
export const InputFileAtom = ({
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
  const [value, setValue] = useState(defaultValue ?? null);
  const [helperText] = useState("");
  const { name, important, placeholder, id } = field;

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  useEffect(() => {
    important && erroForm ? setError(true) : setError(false);
    if (cleanValue) {
      setValue(null);
    }
  }, [erroForm, cleanValue]);

  const validationAction = async (value: any) => {
    setValue(value);
    onChangeCallback(value);
  };

  return (
    <MuiFileInput
      style={style}
      className={`customFileField ${multiline ? "TextArea" : ""} ${
        variant ?? "main"
      }`}
      getInputText={(value) => value ? value.name : placeholder!}
      value={value}
      name={name}
      error={error}
      helperText={helperText}
      disabled={disabled ?? false}
      placeholder={placeholder ?? ""}
      rows={multiline && variant !== "ghost" ? 4 : undefined}
      id={id ? String(id) : undefined}
      clearIconButtonProps={{
        title: "Remove",
        children: <ClearIcon fontSize="small" />
      }}
      onChange={(e) => {
        if (e) {
          setValue(e);
          validationAction(e);
        }
      }}
    />
    // <TextField
    //   style={style}
    //   className={`customTextField ${multiline ? "TextArea" : ""} ${
    //     variant ?? "main"
    //   }`}
    //   error={error}
    //   helperText={helperText}
    //   multiline={multiline}
    //   rows={multiline && variant !== "ghost" ? 4 : undefined}
    //   type={type ?? "text"}
    //   id={id?.toString() ?? ""}
    //   name={name ?? ""}
    //   onChange={(e) => {
    //     if (e.target.value.length <= (maxlength ?? 60)) {
    //       setValue(e.target.value);
    //       validationAction(e.target.value);
    //     }
    //   }}
    //   value={value}
    //   disabled={disabled ?? false}
    //   placeholder={placeholder ?? ""}
    // />
  );
};

export default InputFileAtom;
