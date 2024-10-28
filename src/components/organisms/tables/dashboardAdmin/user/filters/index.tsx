import {
  ButtonAtom,
  ColumnAtom,
  InputTextAtom,
  RowAtom,
  SelectAtom,
} from "../../../../../atoms";
import { TableUserAdminView } from "..";

interface FiltersTableProps {
  stateFilter: string;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
  setView: React.Dispatch<React.SetStateAction<TableUserAdminView>>;
}
export const FiltersTable = ({
  stateFilter,
  setStateFilter,
  dateFilter,
  setDateFilter,
  setView,
}: FiltersTableProps) => {
  return (
    <RowAtom
      style={{ width: "100%", flexFlow: "wrap" }}
      gap={1}
      justifyContent="space-between"
    >
      <ColumnAtom flex={2} style={{ minWidth: 200, maxWidth: 320 }}>
        <RowAtom
          style={{ width: "100%", flexFlow: "wrap" }}
          gap={1}
          justifyContent="flex-start"
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
          <ColumnAtom flex={2} style={{ minWidth: 100, maxWidth: 160 }}>
            <InputTextAtom
              type="date"
              variant="small"
              field={{
                id: "date",
                name: "date",
                placeholder: "Fecha",
                default: dateFilter,
              }}
              onChangeCallback={(value) => {
                setDateFilter(String(value));
                console.log(value);
              }}
            />
          </ColumnAtom>
        </RowAtom>
      </ColumnAtom>
      <ColumnAtom flex={2} style={{ minWidth: 130, maxWidth: 160 }}>
        <ButtonAtom
          adVariant="small"
          style={{
            minWidth: "initial",
            width: "100%",
          }}
          onClick={() => {
            setView("form");
          }}
        >
          Crear Usuario
        </ButtonAtom>
      </ColumnAtom>
    </RowAtom>
  );
};
