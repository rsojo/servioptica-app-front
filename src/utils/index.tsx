
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatNumberWithCommas = (value: number): string => {
  const prevValue = Number(value.toFixed(2));
  return prevValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function clearStrings(input: string): string {
  const lowerCaseString = input.toLowerCase();

  const slug = lowerCaseString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug;
}

export const downloadFile = async (url: string, fileName: string) => {
  const cleanedFileName = clearStrings(fileName);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = cleanedFileName;
    link.target = "_blanck";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export const fetchAndDownloadFile = async (
  apiUrl: string,
  fileName: string
) => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Error fetching the file: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("Content-Type");

    const blob = await response.blob();

    let fileExtension = "";
    if (contentType) {
      const mimeTypeMap: { [key: string]: string } = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        'image/svg+xml': '.svg', 
        "application/pdf": ".pdf",
        'text/csv': '.csv',
        "text/plain": ".txt",
        // Tipos de archivos de Microsoft Office
        "application/msword": ".doc",
        "application/vnd.ms-excel": ".xls",
        "application/vnd.ms-powerpoint": ".ppt",
      };
      fileExtension = mimeTypeMap[contentType] || "";
    }

    const finalFileName = fileName.includes(".")
      ? fileName
      : `${fileName}${fileExtension}`;

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = finalFileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const scrollToTopSive = (size: number) => {
  window.scrollTo({
    top: size,
    behavior: "smooth",
  });
};

export const uxDateFormat = (dateStr: string, smallYear?: boolean): string => {
  //dateStr YYYY-MM-DD || 2024-08-27 13:51:56.429414 || 2024-08-23T10:27:19.840703
  const date = dateStr?.split("T")[0]?.split(" ")[0];
  const dateParts = date?.split("-");

  if (!dateParts || dateParts.length !== 3) {
    return dateStr;
  }

  const [year, month, day] = dateParts;

  if (smallYear) {
    return `${day}/${month}/${year.slice(-2)}`;
  }

  return `${day}/${month}/${year}`;
};

export const ToDay = (): { date: string; time: string } => {
  const now = new Date();
  // YYYY-MM-DD
  const date = now.toISOString().split("T")[0];
  // HH:MM:SS
  const time = now.toTimeString().split(" ")[0];

  return {
    date,
    time,
  };
};
