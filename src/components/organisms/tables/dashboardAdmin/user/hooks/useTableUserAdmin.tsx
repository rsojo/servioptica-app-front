/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  addUsersAdmin,
  getUsersAdmin,
  removeUsersAdmin,
  updateUsersAdmin,
} from "../../../../../../api/Users";
import { PreDataType } from "../../../../../molecules/form/type";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../../../../../store/Auth";
import { TableUserAdminView } from "..";
import { GetUsersActivesData } from "../../../../../../api/Users/type";

export const useTableUsersAdmin = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const [appStore] = useAtom(appStoreAtom);
  const hasFetchedUsers = useRef(false);
  const [view, setView] = useState<TableUserAdminView>("table");
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
  const [usersData, setUsersData] = useState<Array<GetUsersActivesData> | null>(
    null
  );

  const fetchUsersData = async () => {
    try {
      if (appStore.auth?.access_token) {
        setLoading(true);
        const response = await getUsersAdmin(appStore.auth?.access_token);
        const formatingData = response.data.map((item) => ({
          ...item,
          date: item.updated_at.split("T")[0], //"2024-10-16T18:13:59.000000Z"
        }));
        console.log(formatingData);
        setUsersData(formatingData);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
    } finally {
      setLoading(false);
      setView("table");
    }
  };

  const handleAddUsersData = async (data: PreDataType) => {
    setLoading(true);
    if (editData) {
      // UPDATE
      const setDataEdit = {
        name: data?.name as string,
        password: String(data?.password),
        status: Number(data?.status),
      };
      console.log("handleAddUsersData", { ...setDataEdit });
      const response = await updateUsersAdmin({
        token: appStore.auth?.access_token!,
        id: editData.id,
        ...setDataEdit,
      });
      setLoading(false);
      if (response) {
        await fetchUsersData();
        setEditData(null);
      }
    } else {
      // CREATE
      const setData = {
        name: data?.name as string,
        document: data?.document as string,
        email: data?.email as string,
        password: data?.password as string,
      };
      const response = await addUsersAdmin({
        token: appStore.auth?.access_token!,
        ...setData,
      });
      setLoading(false);
      if (!response.error) {
        await fetchUsersData();
      }
    }
  };

  useEffect(() => {
    if (!hasFetchedUsers.current && !loading && appStore.auth?.access_token) {
      hasFetchedUsers.current = true;
      fetchUsersData();
    }
  }, [loading]);

  const handleEdit = (id: number) => {
    const rowData = usersData?.find((i) => i.id === id);
    const defaultData = [
      {
        groupName: "user",
        fieldName: "name",
        newValue: rowData?.name ?? "",
      },
      {
        groupName: "user",
        fieldName: "document",
        newValue: rowData?.document ?? "",
      },
      {
        groupName: "user",
        fieldName: "email",
        newValue: rowData?.email ?? "",
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
    const response = await removeUsersAdmin({
      token: appStore.auth?.access_token!,
      id: id,
    });
    if (response) {
      await fetchUsersData();
      handleCloseDialog();
      setIdDelete(null);
    }
  };
  return {
    usersData,
    editData,
    setEditData,
    open,
    appStore,
    view,
    idDelete,
    setView,
    loading,
    handleAddUsersData,
    handleEdit,
    handleDelete,
    handleClickOpenDialog,
    handleCloseDialog,
    confirmDelete,
  };
};
