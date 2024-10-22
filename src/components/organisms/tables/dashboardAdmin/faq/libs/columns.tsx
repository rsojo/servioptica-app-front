import { GridColDef } from "@mui/x-data-grid";
import generalColumnProps from "../../../../../atoms/table/libs/generalColumnProps";
import { ButtonAtom, RowAtom } from "../../../../../atoms";

const columns: GridColDef[] = [
  {
    ...generalColumnProps,
    field: "id",
    headerName: "Nº",
    minWidth: 50,
    maxWidth: 50,
  },
  {
    ...generalColumnProps,
    field: "answer",
    headerName: "Pregunta",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "state",
    headerName: "Estado",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "date",
    headerName: "Fecha de publicación",
    minWidth: 120,
    valueGetter: (value, row) =>
      `${String(row.date).split("-")[2]}/${String(row.date).split("-")[1]}/${
        String(row.date).split("-")[0]
      }`,
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 200,
    renderCell: (params) => (
      <RowAtom
        style={{ width: "100%", height: '100%' }}
        justifyContent="space-around"
        alignItems="center"
      >
        <ButtonAtom
          size="small"
          adVariant="linkStyle"
          onClick={() => console.log("Editar", params.row)}
        >
          Editar
        </ButtonAtom>
        <ButtonAtom
          size="small"
          adVariant="linkStyle"
          onClick={() => console.log("Eliminar", params.row)}
        >
          Eliminar
        </ButtonAtom>
      </RowAtom>
    ),
  },
  // {
  //   ...generalColumnProps,
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  // },
];

export default columns;
