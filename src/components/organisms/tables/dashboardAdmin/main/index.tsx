import { BASE_COLORS } from "../../../../../style/constants";
import { ColumnAtom, GridAtom, RowAtom, TextAtom } from "../../../../atoms";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FiltersTable } from "./filters";
import { DataGrid } from "@mui/x-data-grid";
import { localeText } from "../../../../atoms/table/libs";
import columns from "./libs/columns";
import { useTableOrdersAdmin } from "./hooks/useTableOrdersAdmin";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export interface RowTableData {
  id: number;
  order: number;
  site: string;
  lot: string;
  state: string;
  date: string;
}

const paginationModel = { page: 0, pageSize: 10 };

export const TableMainAdmin = () => {

  const navetgate = useNavigate();
  const { 
    loading,
    handleDownload,
    setStateFilter,
    stateFilter,
    setDateFilter,
    dateFilter,
    filteredRows
  } = useTableOrdersAdmin();

  if (loading) {
    return (
      <GridAtom
        style={{ minHeight: 320, width: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </GridAtom>
    );
  }
  
  if(!filteredRows) {
    return<></>
  }


  return (
    <GridAtom style={{ width: "100%" }}>
      <GridAtom style={{ height: 505, width: "100%" }} gap={4}>
        <RowAtom style={{ width: "100%" }} gap={2}>
          <ColumnAtom flex={3} style={{ minWidth: 158 }}>
            <RowAtom alignItems="center" gap={2} style={{ height: 32 }}>
              <RowAtom gap={1}>
                <Inventory2RoundedIcon
                  style={{ color: BASE_COLORS.blue, fontSize: 20 }}
                />

                <TextAtom
                  style={{
                    color: BASE_COLORS.blue,
                    fontSize: 20,
                    fontWeight: 900,
                  }}
                >
                  Pedidos
                </TextAtom>
              </RowAtom>
              <span
                style={{
                  background: BASE_COLORS.blue,
                  height: "100%",
                  width: 1,
                }}
              ></span>
              <FilterAltOutlinedIcon
                style={{ color: BASE_COLORS.blue, fontSize: 20 }}
              />
            </RowAtom>
          </ColumnAtom>
          <ColumnAtom flex={12}>
            <FiltersTable
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              onDownloadAction={()=>handleDownload()}
            />
          </ColumnAtom>
        </RowAtom>
        <DataGrid
          localeText={localeText}
          style={{ width: "100%" }}
          rows={filteredRows ?? undefined}
          columns={columns}
          columnVisibilityModel={{ id: false }}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection={false}
          rowSelection={false}
          onRowClick={(params) => {
            if(params.row.pedido_cliente?.startsWith("RX")){
              navetgate(`/order-tracking/${params.row.pedido_cliente}`);
            }else{
              alert("ID de pedido no válido");
            }
          }} // Verificar que el id_pedido es el correcto
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "alternate-row" : ""
          }
          sx={{ border: 0 }}
        />
      </GridAtom>
    </GridAtom>
  );
};
