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
import { useMessage } from "../../../../../../hooks/useMessage";

export const useTableUsersAdmin = () => {
  const [open, setOpen] = useState(false);
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
  const [usersData, setUsersData] = useState<Array<GetUsersActivesData> | null>(null);

  const { successSnackMessage, errorSnackMessage } = useMessage();

  const handleClickOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const fetchUsersData = async () => {
    try {
      if (!appStore.auth?.access_token) return;
      setLoading(true);
      const response = await getUsersAdmin(appStore.auth?.access_token);
      const formatingData = response.data.map((item) => ({
        ...item,
        date: item.updated_at.split("T")[0],
      }));
      setUsersData(formatingData);
    } catch (error) {
      console.error("Error fetching Users:", error);
      errorSnackMessage("Hubo un error al obtener los usuarios.");
    } finally {
      setLoading(false);
      setView("table");
    }
  };

  const handleAddUsersData = async (data: PreDataType) => {
    setLoading(true);
    try {
      if (editData) {
        // UPDATE
        const setDataEdit = {
          name: data?.name as string,
          password: String(data?.password),
          status: Number(data?.status),
        };

        const response = await updateUsersAdmin({
          token: appStore.auth?.access_token!,
          id: editData.id,
          ...setDataEdit,
        });

        if (response.error) {
          errorSnackMessage(response.mensaje);
          return;
        }

        await fetchUsersData();
        setEditData(null);
        successSnackMessage("Usuario actualizado con éxito");
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

        if (response.error) {
          errorSnackMessage(response.mensaje);
          return;
        }

        await fetchUsersData();
        successSnackMessage("Usuario creado con éxito");
      }
    } catch (err) {
      console.error("Error en alta/edición de usuario:", err);
      errorSnackMessage("Hubo un error al procesar el usuario.");
    } finally {
      setLoading(false);
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
    if (!rowData) return;

    const defaultData = [
      { groupName: "user", fieldName: "name", newValue: rowData.name ?? "" },
      { groupName: "user", fieldName: "document", newValue: rowData.document ?? "" },
      { groupName: "user", fieldName: "email", newValue: rowData.email ?? "" },
      { groupName: "user", fieldName: "status", newValue: rowData.status.toString() ?? "" },
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
      const response = await removeUsersAdmin({
        token: appStore.auth?.access_token!,
        id,
      });

      if (response.error) {
        errorSnackMessage(response.mensaje);
        return;
      }

      await fetchUsersData();
      handleCloseDialog();
      setIdDelete(null);
      successSnackMessage("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      errorSnackMessage("Hubo un error al eliminar el usuario.");
    } finally {
      setLoading(false);
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
