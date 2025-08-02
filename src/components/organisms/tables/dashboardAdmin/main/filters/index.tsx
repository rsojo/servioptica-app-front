import { IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ButtonAtom, ColumnAtom, InputTextAtom, RowAtom, SelectAtom } from "../../../../../atoms";

interface FiltersTableProps {
  stateFilter: string;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
  onDownloadAction: () => void
}
export const FiltersTable = ({
  stateFilter,
  setStateFilter,
  dateFilter,
  setDateFilter,
  onDownloadAction,
}: FiltersTableProps) => {
  return (
    <RowAtom style={{ width: "100%", flexFlow: "wrap" }} gap={1}>
      
      <ColumnAtom flex={2} style={{ minWidth: 100, maxWidth: 320 }}>
        <SelectAtom
          id="state"
          name="state"
          variant='small'
          options={[
            { option: "Productivo AGENCIA", value: "Pedido en proceso Productivo AGENCIA" },
            { option: "Productivo LABORATORIO", value: "Pedido en proceso Productivo LABORATORIO" },
            { option: "Envío a AGENCIA", value: "Pedido en proceso de envio DEL LABORATORIO a LA AGENCIA" },
            { option: "Pedido Recibido", value: "Pedido Recibido" }
          ]}
          placeholder={"Todos los estados"}
          defaultValue={stateFilter}
          onChangeCallback={(value) => setStateFilter(value)}
        />
      </ColumnAtom>
      <ColumnAtom flex={2} style={{ minWidth: 160, maxWidth: 320 }}>
        <InputTextAtom
          type="date"
          variant="small"
          field={{
            id: "date",
            name: "fecha_entrada",
            placeholder: "Fecha",
            default: dateFilter,
          }}
          defaultValue={dateFilter}
          onChangeCallback={(value) => {
            setDateFilter(String(value));
            
          }}
          InputProps={{
            endAdornment: dateFilter && (
              <InputAdornment position="end">
                <IconButton onClick={() => setDateFilter("")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ColumnAtom>
      <ColumnAtom flex={2} style={{ minWidth: 130, maxWidth: 200 }}>
        <ButtonAtom
          variant="outlined"
          adVariant="small"
          style={{
            minWidth: "initial",
            width: "100%",
            justifyContent: "flex-start",
          }}
          endIcon={
            <svg width="18.509" height="18.172" viewBox="0 0 18.509 18.172">
              <path
                id="Icon_simple-microsoftexcel"
                data-name="Icon simple-microsoftexcel"
                d="M18.165,2.552h-6.2V3.7h1.828V5.515H11.964v.578h1.828V7.911H11.964v.595h1.828v1.719H11.964v.689h1.828v1.723H11.964v.689h1.828v1.733H11.964v1.264h6.2c.1-.029.18-.145.245-.346a1.691,1.691,0,0,0,.1-.49V2.762c0-.1-.034-.158-.1-.179A.848.848,0,0,0,18.165,2.552Zm-.8,12.5H14.386V13.325H17.36v1.731Zm0-2.42H14.386V10.913H17.36Zm0-2.412H14.386V8.513H17.36v1.711Zm0-2.314H14.386V6.095H17.36V7.911h0Zm0-2.405H14.386V3.7H17.36V5.5ZM0,2.266V16.611L10.92,18.5V.329L0,2.272ZM6.473,13.118q-.062-.169-.585-1.437c-.346-.845-.555-1.337-.616-1.478H5.253L4.081,12.991l-1.566-.106,1.857-3.47-1.7-3.47,1.6-.084L5.324,8.576h.021L6.536,5.737l1.65-.1L6.221,9.389,8.246,13.22l-1.773-.1Z"
                transform="translate(0 -0.328)"
                fill="#707070"
              />
            </svg>
          }
          onClick={onDownloadAction}
        >
          Descarga
        </ButtonAtom>
      </ColumnAtom>
    </RowAtom>
  );
};
