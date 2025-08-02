/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
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
import { useMessage } from "../../../../../../hooks/useMessage";

export const useTablePromotionsAdmin = () => {
  const [open, setOpen] = useState(false);
    const { errorSnackMessage, successSnackMessage } = useMessage();


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
      if (!appStore.auth?.access_token) {return null}
        setLoading(true);
        const response = await getPromotionsAdmin(appStore.auth?.access_token);
        const formatingData = response.data.map((item) => ({
          ...item,
          date: item.end_date.split("T")[0], //"2024-10-16T18:13:59.000000Z"
        }));
        setPromotionsData(formatingData);

        return formatingData
      
    } catch (error) {
      console.error("Error fetching Promotions:", error);
      return error
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

    
    setLoading(true);
    if (!!editData) {
      // UPDATE
      const response = await updatePromotionsAdmin({
        token: appStore.auth?.access_token!,
        id: editData.id,
        ...setData,
      });
      if (response.error) {
        console.error("Error updating Promotions:", response.error);
        errorSnackMessage(response.mensaje);
        setLoading(false);
        return;
      }

      if (response) {
        await fetchPromotionsData();
        setEditData(null);
      }
      successSnackMessage('Promocion actualizada con éxito');
      setLoading(false);
      return;
    } else {
      // CREATE
      const response = await addPromotionsAdmin({
        token: appStore.auth?.access_token!,
        ...setData,
      });
      if(response.error) 
      {
        errorSnackMessage(response.mensaje);

        setLoading(false);
        return;
      }
      if (!response.error) {
        await fetchPromotionsData();
      }
      successSnackMessage('Promocion actualizada con éxito');
      setLoading(false);
      return;
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
    // console.log("[handleEdit] defaultData", defaultData);

    setEditData({ data: defaultData, id: rowData?.id! });
    setView("form");
  };

  const handleDelete = async (id: number) => {
    // console.log("handleDelete", id);
    handleClickOpenDialog();
    setIdDelete(id);
  };

  const confirmDelete = async (id: number) => {
    setLoading(true);
    const response = await removePromotionsAdmin({
      token: appStore.auth?.access_token!,
      id: id,
    });
    if (response.error) {
      console.error("Error al eliminar la promoción:", response.error);
      errorSnackMessage(response.mensaje);
      setLoading(false);
      return;
    }
    if (response) {
      await fetchPromotionsData();
      handleCloseDialog();
      setIdDelete(null);
      successSnackMessage('Promocion eliminada con éxito');
    }
    return response;
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
