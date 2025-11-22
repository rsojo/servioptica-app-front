import { useEffect, useState } from "react";
import { Orders } from "../../../../../../api/Orders";
import { appStoreAtom } from "../../../../../../store/Auth";
import { useAtom } from "jotai";
import { searchOrder } from "../../../../../../store/searchOrder";
import { OrderData, OrderRequest } from "../../../../../../api/Orders/type";
import { useDownloadCSV } from "./useDownloadCSV";

export type DateFilter = {
  from: string; // fecha desde (YYYY-MM-DD)
  to: string;   // fecha hasta (YYYY-MM-DD)
};

export const useTableOrdersAdmin = () => {
    const [appStore] = useAtom(appStoreAtom);
    const [searchOrderAtom] = useAtom(searchOrder);
    const [tableData, setTableData] = useState<OrderData[] | null>(null);
    const [stateFilter, setStateFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>({ from: "", to: "" });
    const [loading, setLoading] = useState(false)

    const uniqueData = tableData
    ? Object.values(
        tableData.reduce((acc: Record<string, OrderData>, item) => {
            const key = item.pedido;
            const currentSeq = Number(item.seq_no) || 0;

            if (!acc[key]) {
            // Primer registro que vemos de este pedido
            acc[key] = item;
            } else {
            const savedSeq = Number(acc[key].seq_no) || 0;

            // Si este tiene un seq_no mayor, reemplazamos
            if (currentSeq > savedSeq) {
                acc[key] = item;
            }
            }

            return acc;
        }, {})
        )
    : null;

    // aplicamos los filtros
    const filteredRows = uniqueData?.filter((row) => {
        const matchesState = stateFilter ? row.estado.includes(stateFilter) : true;

        // ----- Filtro por rango de fechas -----
        const { from, to } = dateFilter;

        // Si no hay ningún filtro de fecha, no filtramos
        if (!from && !to) {
        return matchesState;
        }

        // Fecha del registro (YYYY-MM-DD)
        const rowDateStr = row.fecha_entrada.split(" ")[0];

        // Normalizamos fechas a Date para comparar
        const rowDate = new Date(rowDateStr);

        // Si por lo que sea no se puede parsear, lo excluimos
        if (isNaN(rowDate.getTime())) {
        return false;
        }

        // Fecha desde (puede ser null si viene vacío)
        const fromDate = from ? new Date(from) : null;

        // Si TO está vacío, usamos HOY como límite superior
        const todayStr = new Date().toISOString().split("T")[0];
        const toStr = to || todayStr;
        const toDate = new Date(toStr);

        if (isNaN(toDate.getTime())) {
        return false;
        }

        // Comparación inclusiva: from <= rowDate <= to
        let matchesDate = true;

        if (fromDate && rowDate < fromDate) {
        matchesDate = false;
        }

        if (rowDate > toDate) {
        matchesDate = false;
        }

        return matchesState && matchesDate;
    });

    const fetchTableData = async (document: string) => {
        setLoading(true)
        const isAdmin = appStore.auth?.admin || false;
        try {
            let data:OrderRequest = {
                token: appStore.auth?.access_token!,
                nit: isAdmin ? "" : appStore.auth?.document || "",
                pageSize: 100,
                pageNumber: 1,
                status: null,
                document: document,
                orderCode: null,
                site: null,
                date: null,
            }
            // if(appStore.auth?.admin){
            //     data = {
            //         token: appStore.auth?.access_token!,
            //         pageSize: 100,
            //         pageNumber: 1,
            //         status: null,
            //         document: document,
            //         orderCode: null,
            //         site: null,
            //         date: null,
            //     }
            // }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData]);

    useEffect(() => {
        if(searchOrderAtom.document && appStore.auth?.admin){
            fetchTableData(searchOrderAtom.document);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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