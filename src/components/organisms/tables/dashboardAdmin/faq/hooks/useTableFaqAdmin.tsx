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

export const useTableFaqAdmin = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
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
      // UPDATE
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
      // CREATE
      const response = await addFaqAdmin({
        token: appStore.auth?.access_token!,
        question: data?.title as string,
        answer: data?.description as string,
      });
      if (!response.error) {
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

  const handleEdit = (id: number) => {
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
    handleClickOpenDialog();
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
      handleCloseDialog();
      setIdDelete(null);
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
