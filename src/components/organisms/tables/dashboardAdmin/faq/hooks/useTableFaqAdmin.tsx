/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  addFaqAdmin,
  getFaqAdmin,
  removeFaqAdmin,
  updateFaqAdmin,
} from "../../../../../../api/Faq";
import { PreDataType } from "../../../../../molecules/form/type";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../../../../../store/Auth";
import { TableFaqAdminView } from "..";
import { useMessage } from "../../../../../../hooks/useMessage";

export const useTableFaqAdmin = () => {
  const [open, setOpen] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [faqsData, setFaqsData] = useState<Array<{
    id: number;
    answer: string;
    question: string;
    state: string;
    date: string;
  }> | null>(null);

  const { successSnackMessage, errorSnackMessage } = useMessage();

  const handleClickOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const fetchFaqsData = async () => {
    try {
      if (!appStore.auth?.access_token) return;
      setLoading(true);
      const response = await getFaqAdmin(appStore.auth?.access_token);
      const formatingData = response.data.map((item) => ({
        id: item.id,
        answer: item.answer,
        question: item.question,
        state: String(item.status),
        date: item.updated_at.split("T")[0],
      }));
      setFaqsData(formatingData);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      errorSnackMessage("Hubo un error al obtener las FAQs.");
    } finally {
      setLoading(false);
      setView("table");
    }
  };

  const handleAddFaqsData = async (data: PreDataType) => {
    setLoading(true);
    try {
      if (editData) {
        // UPDATE
        const response = await updateFaqAdmin({
          token: appStore.auth?.access_token!,
          id: editData.id,
          question: data?.title as string,
          answer: data?.description as string,
          state: data?.state as string,
        });

        if (response?.error) {
          errorSnackMessage(response.mensaje ?? "No se pudo actualizar la FAQ.");
          return;
        }

        await fetchFaqsData();
        setEditData(null);
        successSnackMessage("FAQ actualizada con éxito");
      } else {
        // CREATE
        const response = await addFaqAdmin({
          token: appStore.auth?.access_token!,
          question: data?.title as string,
          answer: data?.description as string,
           state: data?.state as string,
        });

        if (response?.error) {
          errorSnackMessage(response.mensaje ?? "No se pudo crear la FAQ.");
          return;
        }

        await fetchFaqsData();
        successSnackMessage("FAQ creada con éxito");
      }
    } catch (error) {
      console.error("Error al guardar FAQ:", error);
      errorSnackMessage("Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedFaqs.current && !loading && appStore.auth?.access_token) {
      hasFetchedFaqs.current = true;
      fetchFaqsData();
    }
  }, [loading]);

  const handleEdit = (id: number) => {
    const rowData = faqsData?.find((i) => i.id === id);
    if (!rowData) return;

    const defaultData = [
      {
        groupName: "faq",
        fieldName: "title",
        newValue: rowData.question ?? "",
      },
      {
        groupName: "faq",
        fieldName: "state",
        newValue: rowData.state ?? "",
      },
      {
        groupName: "faq",
        fieldName: "description",
        newValue: rowData.answer ?? "",
      },
    ];
    setEditData({ data: defaultData, id: rowData.id });
    setView("form");
  };

  const handleDelete = async (id: number) => {
    handleClickOpenDialog();
    setIdDelete(id);
  };

  const confirmDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await removeFaqAdmin({
        token: appStore.auth?.access_token!,
        id,
      });

      if (response?.error) {
        errorSnackMessage(response.mensaje ?? "No se pudo eliminar la FAQ.");
        return;
      }

      await fetchFaqsData();
      handleCloseDialog();
      setIdDelete(null);
      successSnackMessage("FAQ eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar FAQ:", error);
      errorSnackMessage("Ocurrió un error al eliminar la FAQ.");
    } finally {
      setLoading(false);
    }
  };

  return {
    faqsData,
    editData,
    setEditData,
    open,
    appStore,
    view,
    idDelete,
    setView,
    loading,
    handleAddFaqsData,
    handleEdit,
    handleDelete,
    handleClickOpenDialog,
    handleCloseDialog,
    confirmDelete,
  };
};
