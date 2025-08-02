import React, { useEffect, useMemo, useRef, useState } from "react";
import { ContainerAtom, GridAtom, SpaceAtom } from "../atoms";
import { SteperOrderTracking } from "../organisms/steperOrderTracking";
import { BottomOrderTracking } from "../organisms/bottomOrderTracking";
import { TopOrderTracking } from "../organisms/topOrderTracking";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../store/Auth";
import { Orders } from "../../api/Orders";
import { OrderData } from "../../api/Orders/type";
import { CircularProgress } from "@mui/material";
import { useMessage } from "../../hooks/useMessage";
import { Alert } from "@mui/material";


const OrderTracking: React.FC = () => {
  const {id: idPedido} = useParams()
  const [appStore] = useAtom(appStoreAtom);
  const [data, setData] = useState<OrderData[] | null>(null);
  const [currentData, setCurrentData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false)
  const {errorSnackMessage} = useMessage()
  const [invalidOrder, setInvalidOrder] = useState(false);
 
  const isFetchingRef = useRef(false);

  // useEffect(()=>{fetchTableData(idPedido!)}, [idPedido])

  useEffect(() => {
    if (data) {
      const priorities = ['9','8','7','6','5', '4', '3', '2', '1'];
      const currentData = priorities
        .map(priority => data.find(item => item.seq_no === priority))
        .find(item => item !== undefined);
  
      if (currentData) {
        setCurrentData(currentData);
      }
    }
  }, [data]);
  

  const fetchTableData = async (orderCode: string) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    try {
        const data = {
            token: appStore.auth?.access_token!,
            nit: appStore.auth?.document || "",
            pageSize: 10,
            pageNumber: 1,
            status: null,
            document: null,
            orderCode: orderCode,
            site: null,
            date: null,
        }
        const response = await Orders({...data});
        if(response.data.length === 0) {
          errorSnackMessage("¡Número de orden inválido!")
          setInvalidOrder(true); // Marcar error para mostrar alerta

          return
        };
        setInvalidOrder(false);
        const newData = response.data.map((item, index)=>({...item, id: index + 1}))
        setData(newData);
    } catch (error) {
        console.error("Error fetching Table Data:", error);
    } finally {
      setLoading(false)
    }
}

useEffect(() => {
  setData(null); // Reiniciar datos
  setCurrentData(null); // Reiniciar datos actuales
  isFetchingRef.current = false; // Permitir nuevas solicitudes
  if (idPedido) {
    fetchTableData(idPedido);
  }
}, [idPedido]);

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

if (invalidOrder) {
  return (
    <GridAtom
      style={{ minHeight: 320, width: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      <Alert severity="error" variant="filled">
        El número de pedido no es válido. Por favor, introduce un número correcto.
      </Alert>
    </GridAtom>
  );
}


  return (
    <ContainerAtom
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        maxWidth: 1440,
      }}
    >
      <SpaceAtom v={40} />
      <GridAtom gap={4} style={{ width: "100%" }} alignItems="center">
        <TopOrderTracking data={currentData} />
        <span
          style={{ borderBottom: "1px solid", width: "100%", marginBottom: 40 }}
        />
        <SteperOrderTracking currentStep={Number(currentData?.seq_no ?? '0')} data={data}/>
        <span
          style={{ borderBottom: "1px solid", width: "100%", marginTop: 32 }}
        />
        <BottomOrderTracking data={currentData} />
      </GridAtom>
    </ContainerAtom>
  );
};

export default OrderTracking;
