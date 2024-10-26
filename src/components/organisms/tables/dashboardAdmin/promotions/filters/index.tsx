
import {
  ButtonAtom,
  ColumnAtom,
  RowAtom,
  SelectAtom,
} from "../../../../../atoms";
import { TablePromotionsAdminView } from "..";

interface FiltersTableProps {
  stateFilter: string;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
  setView: React.Dispatch<React.SetStateAction<TablePromotionsAdminView>>
}
export const FiltersTable = ({
  stateFilter,
  setStateFilter,
  setView
}: FiltersTableProps) => {


  return (
    <RowAtom
      style={{ width: "100%", flexFlow: "wrap" }}
      gap={1}
      justifyContent="space-between"
    >
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
      <ColumnAtom flex={2} style={{ minWidth: 130, maxWidth: 180 }}>
        <ButtonAtom
          adVariant="small"
          style={{
            minWidth: "initial",
            width: "100%",
          }}
          onClick={() => {setView('form')}}
        >
          Crear Promoción
        </ButtonAtom>
      </ColumnAtom>
    </RowAtom>
  );
};
