import { useCallback } from "react";
import { OrderData } from "../../../../../../api/Orders/type";

export function useDownloadCSV<T extends keyof OrderData>() {
  const downloadCSV = useCallback(
    (
      data: OrderData[],
      keys: T[],
      headersMap: Partial<Record<T, string>>,
      filename = 'export.csv'
    ) => {
      if (!data.length || !keys.length) return;

      // Cabeceras personalizadas
      const headers = keys.map(key => headersMap[key]).join(',');

      // Filas de datos
      const rows = data.map(row =>
        keys.map(key => {
          const cell = row[key];
          if (cell === null || cell === undefined) return '';
          return `"${String(cell).replace(/"/g, '""')}"`;
        }).join(',')
      );

      // Contenido completo
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    []
  );

  return downloadCSV;
}