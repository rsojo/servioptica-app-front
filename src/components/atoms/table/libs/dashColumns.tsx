import { GridColDef } from "@mui/x-data-grid";
import generalColumnProps from "./generalColumnProps";

const dashColumns: GridColDef[] = [
  {
    ...generalColumnProps,
    field: "id",
    headerName: "Nº",
    minWidth: 50,
    maxWidth: 50,
  },
  {
    ...generalColumnProps,
    field: "order",
    headerName: "Pedido Nº",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "site",
    headerName: "Sede",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "lot",
    headerName: "Lote",
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
    headerName: "Fecha",
    minWidth: 120,
    valueGetter: (value, row) => `${String(row.date).split('-')[2]}/${String(row.date).split('-')[1]}/${String(row.date).split('-')[0]}`,
  },
  // {
  //     field: 'actions',
  //     headerName: 'Acciones',
  //     width: 200,
  //     renderCell: (params) => (
  //       <div>
  //         <button onClick={() => console.log('Ver',params.row)}>Ver</button>
  //         <button onClick={() => console.log('Editar',params.row)}>Editar</button>
  //         <button onClick={() => console.log('Eliminar',params.row)}>Eliminar</button>
  //       </div>
  //     ),
  //   },
  // {
  //   ...generalColumnProps,
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  // },
];

export default dashColumns;
