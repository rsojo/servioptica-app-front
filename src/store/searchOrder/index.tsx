import { atom } from "jotai";

type SearchParams = {
    pageSize: number;
    pageNumber: number;
    status: string | null;
    document: string | null;
    orderCode: string | null;
    site: string | null;
    date: string | null;
};

export const searchOrderDefaultData = {
    pageSize: 1,
    pageNumber: 100,
    status: null,
    document: null,
    orderCode: null,
    site: null,
    date: null,
}
  

export const searchOrder = atom<SearchParams>(searchOrderDefaultData);