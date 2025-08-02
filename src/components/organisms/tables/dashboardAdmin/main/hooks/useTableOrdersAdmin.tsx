import { useEffect, useState } from "react";
import { Orders } from "../../../../../../api/Orders";
import { appStoreAtom } from "../../../../../../store/Auth";
import { useAtom } from "jotai";
import { searchOrder } from "../../../../../../store/searchOrder";
import { OrderData } from "../../../../../../api/Orders/type";
import { useDownloadCSV } from "./useDownloadCSV";

export const useTableOrdersAdmin = () => {
    const [appStore] = useAtom(appStoreAtom);
    const [searchOrderAtom] = useAtom(searchOrder);
    const [tableData, setTableData] = useState<OrderData[] | null>(null);
    const [stateFilter, setStateFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [loading, setLoading] = useState(false)

    const uniqueData = tableData
    ? tableData.filter(
          (item, index, self) =>
              self.findIndex((t) => t.pedido === item.pedido) === index
      )
    : null;
    const filteredRows = uniqueData?.filter((row) => {
        const matchesState = stateFilter ? row.estado.includes(stateFilter) : true;
        // const matchesDate = dateFilter ? (row.fecha_entrada.split(' ')[0] === dateFilter || new Date(row.fecha_entrada) >= new Date(dateFilter)) : true;
        const matchesDate = dateFilter ? row.fecha_entrada.split(' ')[0] === dateFilter : true;


        return matchesState && matchesDate;
    });

    const fetchTableData = async (document: string) => {
        setLoading(true)
        try {
            const data = {
                token: appStore.auth?.access_token!,
                nit: appStore.auth?.document || "",
                pageSize: 100,
                pageNumber: 1,
                status: null,
                document: document,
                orderCode: null,
                site: null,
                date: null,
            }
            const response = await Orders({...data});
            const newData = response.data.map((item, index)=>({...item, id: index + 1}))
            setTableData(newData);
        } catch (error) {
            console.error("Error fetching Table Data:", error);
        } 
        finally {
            setLoading(false)
        }
    }

    const downloadCSV = useDownloadCSV();

    const handleDownload = () => {
        if (!filteredRows || filteredRows.length === 0) {
            console.warn("No data available to download.");
            return;
        }
        downloadCSV(
        filteredRows,
        ['document_no', 'cliente_contacto', 'lote_num_laboratorio', 'estado', 'fecha_entrada'],
        {
            document_no: 'Pedido Nº',
            cliente_contacto: 'Sede',
            lote_num_laboratorio: 'Lote',
            estado: 'Estado',
            fecha_entrada: 'Fecha Entrada'
        }
        );
    };


    //INIT
    useEffect(() => {
        if(!tableData && !appStore.auth?.admin!){
            fetchTableData(appStore.auth?.document!)
        }
    }, [tableData]);

    useEffect(() => {
        if(searchOrderAtom.document && appStore.auth?.admin){
            fetchTableData(searchOrderAtom.document);
        }
    }, [searchOrderAtom]);
    
    return {
        handleDownload,
        setStateFilter,
        stateFilter,
        setDateFilter,
        dateFilter,
        filteredRows,
        loading
    }
}