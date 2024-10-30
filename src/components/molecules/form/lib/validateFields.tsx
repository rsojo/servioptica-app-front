import {
  ErrorFrormType,
  FieldsStructure,
  FieldsValueType,
  GroupFields,
  PreDataType,
} from "../type";

export const validateFields = async (
  groupFields: GroupFields[],
  preData: PreDataType
): Promise<ErrorFrormType[] | null> => {
  const errors: ErrorFrormType[] = [];

  for (const group of groupFields) {
    for (const field of group.fields) {
      const value = preData ? preData[field.name!] : "";
      const response = await validateField({
        groupId: group.id,
        field,
        value,
      });
      if (response) {
        errors.push(response);
      }
    }
  }
  return errors.length > 0 ? errors : null;
};

export const validateField = async ({
  groupId,
  field,
  value,
}: {
  groupId?: number;
  field: Partial<FieldsStructure>;
  value: FieldsValueType;
}): Promise<ErrorFrormType | null> => {
  const minlength = field.minlength ?? 3;
  const maxlength = field.maxlength ?? 60;
  if (field.important) {
    if (value === undefined || value === null) {
      return {
        groupId: groupId!,
        fieldId: field.id!,
        errorMessage: `Este campo es requerido!`,
      };
    }

    switch (field.type) {
      case "text":
        if (String(value).length! < minlength) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: field.textError ?? `Mínimo ${minlength} caracteres.`,
          };
        }
        if (String(value).length! > maxlength) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: field.textError ?? `Máximo ${minlength} caracteres.`,
          };
        }
        return null;
      case "select":
        if (String(value).length === 0 || value === "NA") {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: "",
          };
        }
        return null;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== "string" || !emailRegex.test(value)) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            fieldName: field.name,
            errorMessage:
              field.textError ?? `El formato del ${field.label} es inválido.`,
          };
        }
        return null;

      case "number":
        if (String(value).length! < minlength) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage:
              field.textError ??
              `Debe tener entre más de ${minlength} caracteres.`,
          };
        }
        return null;

      case "tel":
        if (minlength || maxlength) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage:
              field.textError ??
              `Este campo debe tener entre ${minlength} y ${maxlength} caracteres.`,
          };
        }
        return null;
      case "password":
        if (String(value).length < minlength) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: field.textError ?? `Mínimo ${minlength} caracteres.`,
          };
        }

        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[\W_])(?!.*[a-z]{2})(?!.*\d{2}).{8,}$/;
        if (!passwordRegex.test(String(value))) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage:
              field.textError ??
              `Debe tener al menos una letra mayúscula, un carácter especial, sin números ni letras consecutivas.`,
          };
        }
        return null;

      default:
        return null;
    }
  }

  return null;
};
