/* eslint-disable react-hooks/exhaustive-deps */

import GridAtom from "../../../atoms/grid";
import {
  ErrorFrormType,
  FieldsStructure,
  FieldsTypes,
  FieldsValueType,
} from "../type";
import { useEffect } from "react";
import LabelAtom from "../../../atoms/label";
import RowAtom from "../../../atoms/row";
import InputTextAtom from "../../../atoms/inputText";
import InputRadioAtom from "../../../atoms/inputRadio";
import InputCheckBoxAtom from "../../../atoms/inputCheckbox";
import SelectAtom from "../../../atoms/select";
import { BASE_COLORS } from "../../../../style/constants";
import InputFileAtom from "../../../atoms/inputFile";

const sizeWidth = (columnSize: number): string => {
  const percentage = (columnSize / 12) * 100;
  return `${percentage}%`;
};

const FieldConstructor = ({
  field,
  children,
  index,
}: {
  field: Partial<FieldsStructure>;
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <GridAtom
      className="FieldConstructor"
      gap={1}
      style={{
        flex: `${field.columnSize} 0 calc(${sizeWidth(
          field.columnSize!
        )} - 16px)`,
        width: "100%",
        minWidth: 200,
        maxWidth: 768,
      }}
    >
      {field.label && field.label.length > 0 && (
        <LabelAtom
          htmlFor={`${field.id}_${field.name}_${index + 1}`}
          important={field.important}
          style={{color: BASE_COLORS.blue}}
        >
          {field.label}
        </LabelAtom>
      )}
      {children}
    </GridAtom>
  );
};

export const FieldsConstructor = ({
  errorForm,
  fields,
  setPreData,
}: {
  errorForm: ErrorFrormType;
  fields: Array<Partial<FieldsStructure>>;
  setPreData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: FieldsValueType;
    } | null>
  >;
}) => {
  const handleFieldChange = (fieldName: string, value: any) => {
    setPreData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    fields.forEach((field) => {
      if (field.default !== undefined) {
        handleFieldChange(field.name!, field.default);
      }
    });
  }, [fields, setPreData]);

  return (
    <RowAtom gap={4} style={{ flexFlow: "wrap", width: "100%" }}>
      {fields.map((field: Partial<FieldsStructure>, index: number) => {
        const type = field.type as FieldsTypes;
        const defaultTextValue = field.default as string;
        const defaultNumberValue = field.default as number;

        switch (type) {
          case "file":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputFileAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={field.type}
                  disabled={false}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) => {
                    handleFieldChange(field.name!, value);
                  }}
                />
              </FieldConstructor>
            );
          case "text":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={field.type}
                  disabled={false}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) => {
                    handleFieldChange(field.name!, value);
                  }}
                />
              </FieldConstructor>
            );
          case "number":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={"number"}
                  disabled={false}
                  defaultValue={defaultNumberValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "radio":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputRadioAtom
                  id={`${field.id}_${field.name}_${index + 1}`}
                  name={field.name!}
                  disabled={false}
                  important={field.important}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  options={field.options!}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "check":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputCheckBoxAtom
                  id={`${field.id}_${field.name}_${index + 1}`}
                  name={field.name!}
                  disabled={false}
                  important={field.important}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  options={field.options!}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "date":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={"date"}
                  disabled={false}
                  defaultValue={defaultNumberValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "select":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <SelectAtom
                  id={`${field.id}_${field.name}_${index + 1}`}
                  name={field.name}
                  variant="general"
                  disabled={false}
                  important={field.important}
                  defaultValue={field.default}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  options={field.options!}
                  placeholder={field.placeholder}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "textarea":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={"text"}
                  multiline
                  rows={5}
                  disabled={false}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "email":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={"email"}
                  disabled={false}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "tel":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={"tel"}
                  disabled={false}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          case "password":
            return (
              <FieldConstructor
                key={`${field.id}_${index + 1}`}
                field={field}
                index={index}
              >
                <InputTextAtom
                  field={{
                    ...field,
                    id: `${field.id}_${field.name}_${index + 1}`,
                  }}
                  type={"password"}
                  disabled={false}
                  defaultValue={defaultTextValue}
                  erroForm={field.important && errorForm?.fieldId === field.id}
                  onChangeCallback={(value) =>
                    handleFieldChange(field.name!, value)
                  }
                />
              </FieldConstructor>
            );
          default:
            return <></>;
        }
      })}
    </RowAtom>
  );
};
