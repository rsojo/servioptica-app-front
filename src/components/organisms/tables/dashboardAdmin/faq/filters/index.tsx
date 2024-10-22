import { ColumnAtom, RowAtom, SelectAtom } from "../../../../../atoms";

interface FiltersTableProps {
  stateFilter: string;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
}
export const FiltersTable = ({
  stateFilter,
  setStateFilter,
}: FiltersTableProps) => {
  return (
    <RowAtom style={{ width: "100%", flexFlow: "wrap" }} gap={1}>
      <ColumnAtom flex={2} style={{ minWidth: 100, maxWidth: 160 }}>
        <SelectAtom
          id="state"
          name="state"
          variant="small"
          options={[
            { option: "En proceso", value: "En proceso" },
            { option: "Finalizado", value: "Finalizado" },
          ]}
          placeholder={"Estado"}
          defaultValue={stateFilter}
          onChangeCallback={(value) => setStateFilter(value)}
        />
      </ColumnAtom>
    </RowAtom>
  );
};
