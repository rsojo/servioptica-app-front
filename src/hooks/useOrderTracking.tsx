import { useEffect, useRef, useState } from "react";
import { Orders } from "../api/Orders";
import { useAtom } from "jotai";
import { appStoreAtom } from "../store/Auth";
import { OrderData } from "../api/Orders/type";
import { useMessage } from "./useMessage";

export const useOrderTracking = () => {
    const [loading, setLoading] = useState(false)
    const [appStore] = useAtom(appStoreAtom);
    const [data, setData] = useState<OrderData[] | null>(null);
    const [currentData, setCurrentData] = useState<OrderData | null>(null);
    const isFetchingRef = useRef(false);
    const {errorSnackMessage} = useMessage()
    
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
              return null
            };
            const newData = response.data.map((item, index)=>({...item, id: index + 1}))
            setData(newData);
            return newData
        } catch (error) {
            console.error("Error fetching Table Data:", error);
            return null
        } finally {
          setLoading(false)
        }
    }

    
    return {loading, data, currentData, fetchTableData}
}