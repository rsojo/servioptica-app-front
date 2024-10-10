import { useMemo } from "react";
import { GroupFields } from "../type";

interface UseGroupVisibilityProps {
  groupsFields: GroupFields[];
  keys: string[];
  preData: any;
}

const useGroupVisibility = ({
  groupsFields,
  keys,
  preData,
}: UseGroupVisibilityProps) => {
  const visibleGroups = useMemo(() => {
    const relevantFieldValues = keys.reduce((acc, key) => {
      groupsFields.forEach((group) => {
        group.fields.forEach((field) => {
          if (field.name === key) {
            const defaultValue = field.default === key;
            if (!preData) {
              acc[key] = defaultValue;
            } else {
              const preDataValue = preData[key]?.[key] ?? defaultValue;
              acc[key] = preDataValue;
            }
          }
        });
      });
      return acc;
    }, {} as { [key: string]: boolean });
    return groupsFields.filter((group) => {
      if (!group.key) return true;
      if (!keys.includes(group.key)) return true;
      return relevantFieldValues[group.key];
    });
  }, [groupsFields, keys, preData]);

  return visibleGroups;
};

export default useGroupVisibility;
