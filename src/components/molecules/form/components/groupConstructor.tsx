
import GridAtom from "../../../atoms/grid";
import { FieldsConstructor } from ".";
import { ErrorFrormType, GroupFields } from "../type";
import TitleAtom from "../../../atoms/title";
import DividingLineAtom from "../../../atoms/dividingLine";

export const GroupConstructor = ({
  errorForm,
  groupsFields,
  setPreData,
}: {
  errorForm?: ErrorFrormType | null;
  groupsFields: GroupFields[];
  setPreData: React.Dispatch<any>;
}) => {
  return (
    <GridAtom gap={6}>
      {groupsFields.map((groupFields: GroupFields, index: number) => {
        const isOwnError = errorForm?.fieldId === groupFields.id;

        return (
          <GridAtom
            key={index + 1}
            gap={5}
            className={groupFields.className ?? ""}
          >
            {groupFields.title?.length! > 0 && index !== 0 && (
              <DividingLineAtom orientation="h" />
            )}
            <GridAtom key={`${groupFields.id}_${index + 1}`} gap={4}>
              {groupFields.title?.length! > 0 && (
                <GridAtom>
                  <TitleAtom type="h1">{groupFields.title}</TitleAtom>
                </GridAtom>
              )}
              {groupFields.subTitle?.length! > 0 && (
                <GridAtom>
                  <TitleAtom type="h2">{groupFields.subTitle}</TitleAtom>
                </GridAtom>
              )}
              <FieldsConstructor
                errorForm={isOwnError ? errorForm : null}
                fields={groupFields.fields}
                setPreData={setPreData}
              />
            </GridAtom>
          </GridAtom>
        );
      })}
    </GridAtom>
  );
};
