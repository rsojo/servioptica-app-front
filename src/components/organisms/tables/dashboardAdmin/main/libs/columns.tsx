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
    field: "document_no",
    headerName: "Pedido Nº",
  },
  {
    ...generalColumnProps,
    field: "cliente_contacto",
    headerName: "Sede",
  },
  {
    ...generalColumnProps,
    field: "lote_num_laboratorio",
    headerName: "Lote",
    minWidth: 200,
    maxWidth: 200,
  },
  {
    ...generalColumnProps,
    field: "estado",
    headerName: "Estado",
    minWidth: 200,
    maxWidth: 200,
  },
  {
    ...generalColumnProps,
    field: "fecha_entrada",
    headerName: "Fecha de Entrada",
    minWidth: 200,
    maxWidth: 200,
    valueGetter: (value, row) => {
      const splitDate = String(value).split(' ')[0].split('-')
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
