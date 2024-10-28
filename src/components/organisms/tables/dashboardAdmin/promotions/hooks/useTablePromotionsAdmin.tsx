/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  addPromotionsAdmin,
  getPromotionsAdmin,
  removePromotionsAdmin,
  updatePromotionsAdmin,
} from "../../../../../../api/Promotions";
import { PreDataType } from "../../../../../molecules/form/type";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../../../../../store/Auth";
import { TablePromotionsAdminView } from "..";
import { GetPromotionsActivesData } from "../../../../../../api/Promotions/type";
import { fileToBase64 } from "../../../../../../utils";

export const useTablePromotionsAdmin = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const [appStore] = useAtom(appStoreAtom);
  const hasFetchedPromotions = useRef(false);
  const [view, setView] = useState<TablePromotionsAdminView>("table");
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
  const [promotionsData, setPromotionsData] =
    useState<Array<GetPromotionsActivesData> | null>(null);

  const fetchPromotionsData = async () => {
    try {
      if (appStore.auth?.access_token) {
        setLoading(true);
        const response = await getPromotionsAdmin(appStore.auth?.access_token);
        const formatingData = response.data.map((item) => ({
          ...item,
          date: item.updated_at.split("T")[0], //"2024-10-16T18:13:59.000000Z"
        }));
        console.log(formatingData)
        setPromotionsData(formatingData);
      }
    } catch (error) {
      console.error("Error fetching Promotions:", error);
    } finally {
      setLoading(false);
      setView("table");
    }
  };

  const handleAddPromotionsData = async (data: PreDataType) => {
    
    const setData = {
      description: data?.description as string,
      title: data?.title as string,
      link: data?.link as string,
      end_date: data?.end_date as string,
      start_date: data?.start_date as string,
      img: await fileToBase64(data?.image as File),
    };
    console.log( 'handleAddPromotionsData',{...setData})
    
    setLoading(true);
    if (!!editData) {
      // UPDATE
      const response = await updatePromotionsAdmin({
        token: appStore.auth?.access_token!,
        id: editData.id,
        ...setData,
      });
      if (response) {
        await fetchPromotionsData();
        setEditData(null);
      }
    } else {
      // CREATE
      const response = await addPromotionsAdmin({
        token: appStore.auth?.access_token!,
        ...setData,
      });
      if (!response.error) {
        await fetchPromotionsData();
      }
    }
  };

  useEffect(() => {
    if (
      !hasFetchedPromotions.current &&
      !loading &&
      appStore.auth?.access_token
    ) {
      hasFetchedPromotions.current = true;
      fetchPromotionsData();
    }
  }, [loading]);

  const handleEdit = (id: number) => {
    const rowData = promotionsData?.find((i) => i.id === id);
    const defaultData = [
      {
        groupName: "promotion",
        fieldName: "title",
        newValue: rowData?.title ?? "",
      },
      {
        groupName: "promotion",
        fieldName: "description",
        newValue: rowData?.description ?? "",
      },
      {
        groupName: "promotion",
        fieldName: "link",
        newValue: rowData?.link ?? "",
      },
      {
        groupName: "promotion",
        fieldName: "start_date",
        newValue: rowData?.start_date ?? "",
      },
      {
        groupName: "promotion",
        fieldName: "end_date",
        newValue: rowData?.end_date ?? "",
      },
    ];
    console.log("[handleEdit] defaultData", defaultData);

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
    const response = await removePromotionsAdmin({
      token: appStore.auth?.access_token!,
      id: id,
    });
    if (response) {
      await fetchPromotionsData();
      handleCloseDialog();
      setIdDelete(null);
    }
  };
  return {
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
    handleClickOpenDialog,
    handleCloseDialog,
    confirmDelete,
  };
};
