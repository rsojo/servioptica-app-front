import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import "./style.css";
import { CheckBoxAtomType } from "./type";

export const InputCheckBoxAtom = ({
  id,
  name,
  disabled,
  className,
  defaultValue,
  style,
  options,
  onChangeCallback,
}: CheckBoxAtomType) => {
  const initialCheckedState = useMemo(() => {
    return options.reduce((acc, item) => {
      acc[item.value] = defaultValue === item.value;
      return acc;
    }, {} as { [key: string]: boolean });
  }, [defaultValue]);

  const [checkedState, setCheckedState] = useState(initialCheckedState);

  useEffect(() => {
    setCheckedState(initialCheckedState);
  }, [defaultValue]);

  // useEffect(() => {
  //   onChangeCallback(checkedState);
  // }, [checkedState]);

  const handleChange = (value: string) => {
    onChangeCallback({
      ...checkedState,
      [value]: !checkedState[value],
    });
    setCheckedState((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  return (
    <FormGroup id={id}>
      {options.map((item) => (
        <FormControlLabel
          key={item.value}
          name={name}
          style={style}
          disabled={disabled}
          className={`checkBoxAtom ${className}`}
          control={
            <Checkbox
              name={item.value}
              onChange={() => handleChange(item.value)}
              checked={checkedState[item.value] ?? false}
            />
          }
          label={item.option}
        />
      ))}
    </FormGroup>
  );
};

export default InputCheckBoxAtom;
