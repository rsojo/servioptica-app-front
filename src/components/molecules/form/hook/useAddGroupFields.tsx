import { useMemo } from "react";
import { FieldsStructure, GroupFields } from "../type";

interface UseAddGroupFieldsProps {
  groupsFields: GroupFields[];
  quantity: number;
  newData: FieldsStructure[];
}

const useAddGroupFields = ({
  groupsFields,
  quantity,
  newData,
}: UseAddGroupFieldsProps): GroupFields[] => {
  return useMemo(() => {
    const newGroups = Array.from({ length: quantity }, (_, index) => {
      const newGroup: GroupFields = {
        id: Math.max(...groupsFields.map((group) => group.id)) + index + 1,
        groupName: `gateway_info_${index + 1}`,
        className: "BlueSubTitle",
        title: index === 0 ? "Passageiros" : "",
        subTitle: `Passageiro ${index + 1}`,
        
        fields: newData.map((field) => ({
          ...field,
          name: `${field.name}_${index + 1}`,
        })),
      };
      return newGroup;
    });

    return [...groupsFields, ...newGroups];
  }, [groupsFields, quantity, newData]);
};

export default useAddGroupFields;
