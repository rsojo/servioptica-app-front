import { GroupFields, PreDataType } from "../type";

export const updateFormWithDefaults = (
  groupFieldsJson: GroupFields[],
  preDataList: PreDataType[]
): GroupFields[] => {
  if (!preDataList || preDataList.length === 0) return groupFieldsJson; // Si no hay preData, devolver el JSON original

  return groupFieldsJson.map((group) => {
    return {
      ...group,
      fields: group.fields.map((field) => {
        // Verificar en cada preData si existe un valor para el campo actual
        for (const preData of preDataList) {
          if (preData && preData[field.name as string] !== undefined) {
            field.default = preData[field.name as string];
          }
        }
        return field;
      }),
    };
  });
};
