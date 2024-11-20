import { GridColDef } from "@mui/x-data-grid";
import generalColumnProps from "../../../../../atoms/table/libs/generalColumnProps";

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
    field: "id_pedido",
    headerName: "Pedido Nº",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "nit",
    headerName: "Sede",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "lote",
    headerName: "Lote",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "estado",
    headerName: "Estado",
    minWidth: 120,
  },
  {
    ...generalColumnProps,
    field: "fecha_actualizacion",
    headerName: "Fecha",
    minWidth: 120,
    valueGetter: (value, row) => {
      const splitDate = String(value).split('T')[0].split('-')
      return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`},
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

export default columns;
