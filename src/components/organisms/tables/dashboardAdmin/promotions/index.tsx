/* eslint-disable react-hooks/exhaustive-deps */
import { BASE_COLORS } from "../../../../../style/constants";
import { ColumnAtom, GridAtom, RowAtom, TextAtom } from "../../../../atoms";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FiltersTable } from "./filters";
import { DataGrid } from "@mui/x-data-grid";
import { localeText } from "../../../../atoms/table/libs";
import columns from "./libs/columns";
import { useState } from "react";

import { Navigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTablePromotionsAdmin } from "./hooks/useTablePromotionsAdmin";
import { PromotionsForm } from "../../../formDash/promotions";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const paginationModel = { page: 0, pageSize: 10 };

export type TablePromotionsAdminView = "table" | "form" | "formEdit";

export const TablePromotions = () => {
  const {
    promotionsData,
    editData,
    setEditData,
    open,
    appStore,
    view,
    idDelete,
    setView,
    loading,
    handleAddPromotionsData,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleCloseDialog,
  } = useTablePromotionsAdmin();

  const [stateFilter, setStateFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredRows = promotionsData?.filter((row) => {
    const matchesDate = dateFilter ? row.date === dateFilter : true;
    return matchesDate;
  });

  if (!appStore.auth?.access_token) {
    return <Navigate to="/login" replace />;
  }

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

  return (
    <GridAtom style={{ width: "100%" }}>
      <GridAtom style={{ width: "100%" }} gap={4}>
        {view === "table" && (
          <ColumnAtom flex={1} style={{ width: "100%" }}>
            <RowAtom style={{ width: "100%" }} gap={2}>
              <ColumnAtom flex={3} style={{ minWidth: 158 }}>
                <RowAtom alignItems="center" gap={2} style={{ height: 32 }}>
                  <RowAtom gap={1}>
                    <BookmarksIcon
                      style={{ color: BASE_COLORS.blue, fontSize: 20 }}
                    />

                    <TextAtom
                      style={{
                        color: BASE_COLORS.blue,
                        fontSize: 20,
                        fontWeight: 900,
                      }}
                    >
                      Promociones
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
                  setView={setView}
                />
              </ColumnAtom>
            </RowAtom>
            <DataGrid
              localeText={localeText}
              style={{ width: "100%" }}
              rows={filteredRows}
              columns={columns(handleEdit, handleDelete)}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 50, 100]}
              checkboxSelection={false}
              rowSelection={false}
              onRowClick={(params) => console.log(params.row)}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "alternate-row"
                  : ""
              }
              sx={{ border: 0 }}
            />
          </ColumnAtom>
        )}
        {view === "form" && (
          <PromotionsForm
            goBack={() => {
              setView("table");
              setEditData(null);
            }}
            onCallBack={(data) => {
              handleAddPromotionsData(data);
            }}
            editData={editData?.data!}
          />
        )}
      </GridAtom>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar Promoción?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción eliminará el registro de Promoción.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => confirmDelete(idDelete!)}
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </GridAtom>
  );
};
