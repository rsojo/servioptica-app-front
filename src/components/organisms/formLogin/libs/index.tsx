import { OptionsSelectAtomIt } from "../../../atoms";
import { GroupFields } from "../../../molecules/form/type";

type Update = {
  groupName: string;
  fieldName: string;
  newValue: string;
};

export const updateDefaultsValues = ({data, updates}:{
  data: GroupFields[],
  updates: Update[]
}): GroupFields[] => {
  const newData = data.map((group) => {
    // Encuentra todas las actualizaciones correspondientes a este grupo
    const groupUpdates = updates.filter((update) => update.groupName === group.groupName);

    if (groupUpdates.length > 0) {
      const updatedFields = group.fields.map((field) => {
        // Encuentra una actualización correspondiente a este campo
        const fieldUpdate = groupUpdates.find(
          (update) => update.fieldName === field.name
        );

        if (fieldUpdate) {
          return { ...field, default: fieldUpdate.newValue };
        }
        return field;
      });
      return { ...group, fields: updatedFields };
    }
    return group;
  });

  return newData;
};

export const updateDefaultValues = (
  data: GroupFields[],
  groupName: string,
  fieldName: string,
  newValue: string
) => {
  const newData = data.map((group) => {
    if (group.groupName === groupName) {
      const updatedFields = group.fields.map((field) => {
        if (field.name === fieldName) {
          return { ...field, default: newValue };
        }
        return field;
      });
      return { ...group, fields: updatedFields };
    }
    return group;
  });
  return newData;
};

export const updateSelectFieldOptions = (
  data: GroupFields[],
  fieldName: string,
  newOptions: OptionsSelectAtomIt[] | null
): GroupFields[] => {
  if (!newOptions) {
    return data;
  }
  return data.map((group) => ({
    ...group,
    fields: group.fields.map((field) => {
      if (field.type === "select" && field.name === fieldName) {
        return {
          ...field,
          options: newOptions,
        };
      }
      return field;
    }),
  }));
};
