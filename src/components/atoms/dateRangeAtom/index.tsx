/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Popover, TextField } from "@mui/material";
import {
  ReactElement,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import { FieldsStructure } from "../../molecules/form/type";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export type DateRangeValue = {
  from: string;
  to: string;
};

export type DateRangeAtomProps = {
  field: Partial<FieldsStructure>;
  cleanValue?: boolean;
  disabled?: boolean;
  onChangeCallback: (value: DateRangeValue) => void | undefined;
  erroForm?: boolean;
  defaultValue?: DateRangeValue;
  style?: React.CSSProperties;
  variant?: "main" | "ghost" | "small";
};

const parseYMDToDate = (value?: string): Date | null => {
  if (!value) return null;
  const parts = value.split("-");
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map((p) => Number(p));
  if (!y || !m || !d) return null;
  // Año, mesIndex (0-11), día -> evita problema de UTC
  return new Date(y, m - 1, d);
};

export const DateRangeAtomV2 = ({
  field,
  cleanValue,
  disabled,
  onChangeCallback,
  erroForm,
  defaultValue,
  style,
  variant,
}: DateRangeAtomProps): ReactElement => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const { name, id } = field;
  const important = field.important;

  // Inicializar desde defaultValue (sin timezone bug)
  useEffect(() => {
    setFromDate(parseYMDToDate(defaultValue?.from));
    setToDate(parseYMDToDate(defaultValue?.to));
  }, [defaultValue]);

  // Limpiar valores si cleanValue cambia
  useEffect(() => {
    important && erroForm ? setError(true) : setError(false);
    if (cleanValue) {
      setFromDate(null);
      setToDate(null);
      onChangeCallback({ from: "", to: "" });
    }
  }, [erroForm, cleanValue]);

  const formatToYMD = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplay = (date: Date | null) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const displayValue = (() => {
    if (fromDate && toDate) return `${formatDisplay(fromDate)} - ${formatDisplay(toDate)}`;
    if (fromDate && !toDate) return `${formatDisplay(fromDate)} - `;
    if (!fromDate && toDate) return ` - ${formatDisplay(toDate)}`;
    return "";
  })();

  const hasValue = !!(fromDate || toDate);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return;

    // si ya hay valores, limpiamos y empezamos de cero
    if (hasValue) {
      setFromDate(null);
      setToDate(null);
      setHelperText("");
      setError(false);
      onChangeCallback({ from: "", to: "" });
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangeFrom = (date: Date | null) => {
    setFromDate(date);
    const newValue: DateRangeValue = {
      from: formatToYMD(date),
      to: formatToYMD(toDate),
    };
    onChangeCallback(newValue);
  };

  const handleChangeTo = (date: Date | null) => {
    setToDate(date);
    const newValue: DateRangeValue = {
      from: formatToYMD(fromDate),
      to: formatToYMD(date),
    };
    onChangeCallback(newValue);
  };

  useEffect(() => {
    if (fromDate && toDate && open) {
      const t = setTimeout(() => handleClose(), 200);
      return () => clearTimeout(t);
    }
  }, [fromDate, toDate, open]);

  return (
    <>
      <TextField
        style={style}
        className={`customTextField ${variant ?? "main"}`}
        error={error}
        helperText={helperText}
        id={id?.toString() ?? ""}
        name={name ?? ""}
        value={displayValue}
        onClick={handleOpen}
        placeholder="Seleccionar fecha"
        disabled={disabled ?? false}
        InputProps={{
          readOnly: true,
          endAdornment: hasValue ? (
            <CloseIcon fontSize="small" style={{ position: "absolute", right: 6, cursor: "pointer" }} />
          ) : (
            <CalendarMonthIcon fontSize="small" style={{ position: "absolute", right: 6, cursor: "pointer" }} />
          ),
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: "flex", p: 2, gap: 2 }}>
            <Box>
              <DateCalendar
                value={fromDate}
                onChange={(newDate) => handleChangeFrom(newDate)}
              />
            </Box>
            <Box>
              <DateCalendar
                value={toDate}
                onChange={(newDate) => handleChangeTo(newDate)}
              />
            </Box>
          </Box>
        </LocalizationProvider>
      </Popover>
    </>
  );
};

export default DateRangeAtomV2;
