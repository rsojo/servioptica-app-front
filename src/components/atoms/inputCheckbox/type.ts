import { CSSProperties } from "react";

export type CheckBoxAtomType = {
    id?: string;
    name: string;
    disabled?: boolean;
    important?: boolean;
    erroForm?: boolean;
    defaultValue?: string;
    checked?: boolean;
    className?: any;
    options: Array<{ option: string; value: string }>;
    style?: CSSProperties;
    onChangeCallback: (value: { [key: string]: boolean }) => void | undefined;
  };