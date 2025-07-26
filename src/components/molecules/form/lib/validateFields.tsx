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
      case "textarea":
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
        const strVal = String(value);

        if (strVal.length < minlength) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: field.textError ?? `Mínimo ${minlength} caracteres.`,
          };
        }

        const hasUpperCase = /[A-Z]/.test(strVal);
        const hasSpecialChar = /[\W_]/.test(strVal);
        const hasConsecutiveLower = /[a-z]{2}/.test(strVal);
        const hasConsecutiveDigits = /\d{2}/.test(strVal);

        // if (!hasUpperCase || !hasSpecialChar) {
          // return {
            // groupId: groupId!,
            // fieldId: field.id!,
            // errorMessage:
              // field.textError ??
              // `Debe contar con numeros, letras mayúsculas y caracteres especiales.`,
          // };
        // }

        return null;


      case "date":
        if (!value || isNaN(Date.parse(String(value)))) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: field.textError ?? `Fecha inválida o no seleccionada.`,
          };
        }
        return null;

      case "file":
        const isValidImage = (typeof File !== "undefined" && value instanceof File);
        console.log('isValidImage', {isValidImage, value});
        if (!isValidImage) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage: field.textError ?? `Debe subir una imagen válida.`,
          };
        }
        return null;

      case "url":
        const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        if (typeof value !== "string" || !urlRegex.test(value)) {
          return {
            groupId: groupId!,
            fieldId: field.id!,
            errorMessage:
              field.textError ?? `Debe ingresar una URL válida (https://...)`,
          };
        }
        return null;

      default:
        return null;
    }
  }

  return null;
};
