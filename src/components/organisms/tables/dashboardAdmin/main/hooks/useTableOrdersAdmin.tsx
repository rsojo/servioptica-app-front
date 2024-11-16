import { useEffect, useState } from "react";
import { RowTableData } from "..";
import { Orders } from "../../../../../../api/Orders";
import { appStoreAtom } from "../../../../../../store/Auth";
import { useAtom } from "jotai";
import { searchOrder } from "../../../../../../store/searchOrder";

export const useTableOrdersAdmin = () => {
    const [appStore] = useAtom(appStoreAtom);
    const [searchOrderAtom] = useAtom(searchOrder);
    const [tableData, setTableData] = useState<any[]>([]);
    const [siteFilter, setSiteFilter] = useState("");
    const [stateFilter, setStateFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const filteredRows = tableData
    //const filteredRows = tableData.filter((row) => {
    //    const matchesSite = siteFilter ? row.site.includes(siteFilter) : true;
    //    const matchesState = stateFilter ? row.state.includes(stateFilter) : true;
    //    const matchesDate = dateFilter ? row.date === dateFilter : true;
    //    return matchesSite && matchesState && matchesDate;
    //});

    const fetchTableData = async (document: string) => {
        try {
            if(document){
                const data = {
                    token: appStore.auth?.access_token!,
                    pageSize: 1,
                    pageNumber: 100,
                    status: null,
                    document: document,
                    orderCode: null,
                    site: null,
                    date: null,
                }
                const response = await Orders({...data});
                console.log("Orders response", response);
                setTableData(response.data);
        }
        } catch (error) {
            console.error("Error fetching Table Data:", error);
        }
    }
    //INIT
    useEffect(() => {
        if(!tableData && !appStore.auth?.admin){fetchTableData(appStore.auth?.document!)}
    }, [tableData]);

    useEffect(() => {
        if(searchOrderAtom.document && appStore.auth?.admin){
            fetchTableData(searchOrderAtom.document);
        }
    }, [searchOrderAtom]);
    
    return {
        setSiteFilter,
        siteFilter,
        setStateFilter,
        stateFilter,
        setDateFilter,
        dateFilter,
        filteredRows
    }
}