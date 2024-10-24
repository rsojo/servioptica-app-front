/* eslint-disable react-hooks/exhaustive-deps */
import { BASE_COLORS } from "../../../../../style/constants";
import { ColumnAtom, GridAtom, RowAtom, TextAtom } from "../../../../atoms";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FiltersTable } from "./filters";
import { DataGrid } from "@mui/x-data-grid";
import { localeText } from "../../../../atoms/table/libs";
import columns from "./libs/columns";
import { useEffect, useRef, useState } from "react";
import {
  addFaqAdmin,
  getFaqAdmin,
  removeFaqAdmin,
  updateFaqAdmin,
} from "../../../../../api/Faq";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../../../../store/Auth";
import { Navigate } from "react-router-dom";
import { FaqForm } from "../../../formDash/faq";
import { PreDataType } from "../../../../molecules/form/type";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const paginationModel = { page: 0, pageSize: 10 };

export type TableFaqAdminView = "table" | "form" | "formEdit";

export const TableFaqAdmin = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [appStore] = useAtom(appStoreAtom);
  const hasFetchedFaqs = useRef(false);
  const [view, setView] = useState<TableFaqAdminView>("table");
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    data: Array<{
      groupName: string;
      fieldName: string;
      newValue: string;
    }>;
    id: number;
  } | null>(null);

  const [stateFilter, setStateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [faqsData, setFaqsData] = useState<Array<{
    id: number;
    answer: string;
    question: string;
    state: string;
    date: string;
  }> | null>(null);

  const fetchFaqsData = async () => {
    try {
      if (appStore.auth?.access_token) {
        setLoading(true);
        const response = await getFaqAdmin(appStore.auth?.access_token);
        const formatingData = response.data.map((item) => ({
          id: item.id,
          answer: item.answer,
          question: item.question,
          state: String(item.status),
          date: item.updated_at.split("T")[0], //"2024-10-16T18:13:59.000000Z"
        }));
        setFaqsData(formatingData);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
      setView("table");
    }
  };

  const handleAddFaqsData = async (data: PreDataType) => {
    setLoading(true);
    if (!!editData) {
      const response = await updateFaqAdmin({
        token: appStore.auth?.access_token!,
        id: editData.id,
        question: data?.description as string,
        answer: data?.title as string,
      });
      if (response) {
        await fetchFaqsData();
        setEditData(null);
      }
    } else {
      const response = await addFaqAdmin({
        token: appStore.auth?.access_token!,
        question: data?.description as string,
        answer: data?.title as string,
      });
      if (response) {
        await fetchFaqsData();
      }
    }
  };

  useEffect(() => {
    if (!hasFetchedFaqs.current && !loading && appStore.auth?.access_token) {
      hasFetchedFaqs.current = true;
      fetchFaqsData();
    }
  }, [loading]);

  const filteredRows = faqsData?.filter((row) => {
    const matchesState = stateFilter ? row.state.includes(stateFilter) : true;
    return matchesState;
  });

  const handleEdit = (id: number) => {
    console.log("handleEdit", id);
    const rowData = faqsData?.find((i) => i.id === id);
    const defaultData = [
      {
        groupName: "faq",
        fieldName: "title",
        newValue: rowData?.question ?? "",
      },
      {
        groupName: "faq",
        fieldName: "description",
        newValue: rowData?.answer ?? "",
      },
    ];
    setEditData({ data: defaultData, id: rowData?.id! });
    setView("form");
  };

  const handleDelete = async (id: number) => {
    console.log("handleDelete", id);
    handleClickOpen();
    setIdDelete(id);
  };

  const confirmDelete = async (id: number) => {
    setLoading(true);
    const response = await removeFaqAdmin({
      token: appStore.auth?.access_token!,
      id: id,
    });
    if (response) {
      await fetchFaqsData();
      handleClose();
      setIdDelete(null);
    }
  };

  if (!appStore.auth?.access_token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <GridAtom
        p={5}
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
          <FaqForm
            goBack={() => {
              setView("table");
            }}
            onCallBack={(data) => {
              handleAddFaqsData(data);
            }}
            editData={editData?.data!}
          />
        )}
      </GridAtom>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar FAQ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción eliminará el registro de FAQ.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color='error' onClick={() => confirmDelete(idDelete!)} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </GridAtom>
  );
};
