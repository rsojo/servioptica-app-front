import { GroupFields } from "../../../molecules/form/type";

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