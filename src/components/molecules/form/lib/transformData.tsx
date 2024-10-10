import { GroupedDataType, PreDataType } from "../type";

export const groupingFormData = (formData: PreDataType): GroupedDataType => {
    if (!formData) return {};

    const groupedData: GroupedDataType = {};
  
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      const parts = key.split('_');
      
      if (parts.length < 2) return;
  
      const group = parts[0];
      const lastPart = parts[parts.length - 1];
      let field, index;
  
      if (isNaN(Number(lastPart))) {
        field = parts.slice(1).join('_');
        index = 0;
      } else {
        field = parts.slice(1, parts.length - 1).join('_');
        index = parseInt(lastPart) - 1;
      }
  
      if (!groupedData[`${group}_data`]) {
        groupedData[`${group}_data`] = [];
      }
  
      if (!groupedData[`${group}_data`][index]) {
        groupedData[`${group}_data`][index] = {};
      }
  
      groupedData[`${group}_data`][index][field] = value;
    });
  
    return groupedData;
};
