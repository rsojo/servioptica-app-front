import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { Message } from "../../context/MessageContext";
import { useState } from "react";

export const SnackbarAtom = (message: Message) => {
  const [open, setOpen] = useState(message.isOpen);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    setOpen(false);
  };
  return (
    <Snackbar onClose={handleClose} open={open} autoHideDuration={7000}>
      <Alert
        onClose={handleClose}
        severity={message.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message.content}
      </Alert>
    </Snackbar>
  );
};
