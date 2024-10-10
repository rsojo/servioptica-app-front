/* eslint-disable react-hooks/exhaustive-deps */

import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { validateFields } from "../lib/validateFields";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { ErrorFrormType, GroupFields, PreDataType } from "../type";
import GridAtom from "../../../atoms/grid";
import RowAtom from "../../../atoms/row";
import ColumnAtom from "../../../atoms/column";
import ButtonAtom from "../../../atoms/button";
interface ActionsFormProps {
  error: ErrorFrormType[] | null;
  refreshPage?: () => void;
  goBack?: () => void;
  onCallBack: () => void;
  formData: PreDataType;
  groupsFields: GroupFields[];
  externalApproval: boolean;
  actionBtnLabel: string;
  actionBackBtnLabel?: string;
  loading: boolean;
}

export const FormActions = ({
  error: externalError,
  loading,
  formData,
  refreshPage,
  goBack,
  onCallBack,
  groupsFields,
  actionBtnLabel,
  externalApproval,
  actionBackBtnLabel,
}: ActionsFormProps) => {
  const [canContinue, setCanContinue] = useState(false);
  const [error, setError] = useState<ErrorFrormType[] | null>(null);

  const handleValidateFields = async () => {
    const response = await validateFields(
      groupsFields,
      formData
    ).then((validate) => {
      const isError = validate?.length! > 0;
      const value = externalApproval && !isError;
      return value;
    });
    setCanContinue(response);
    if (response) {
      setError(externalError ?? null);
    }
    return response;
  };

  useEffect(() => {
    handleValidateFields();
  }, [formData, groupsFields, externalApproval]);

  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  return (
    <GridAtom>
      <RowAtom justifyContent="space-between" alignItems="center" gap={2}>
        <ColumnAtom flex={2}>
          {error && externalError && (
            <Alert
              severity="error"
              style={{
                border: "1px solid #d32f2f28",
                pointerEvents: "none",
              }}
            >
              {error.length > 0
                ? error[0]?.errorMessage
                : " ** Os campos marcados com um asterisco vermelho (*) são obrigatórios para continuar."}
            </Alert>
          )}
        </ColumnAtom>
        <ColumnAtom flex={1}>
          <RowAtom justifyContent="flex-end" gap={2}>
            {goBack && (
              <ButtonAtom
                disabled={loading}
                onClick={() => {
                  goBack();
                }}
                className="linkStyle"
                startIcon={
                  !actionBackBtnLabel && <ArrowBackIosNewRoundedIcon />
                }
              >
                {actionBackBtnLabel ?? "Voltar"}
              </ButtonAtom>
            )}
            {refreshPage && (
              <ButtonAtom
                disabled={loading}
                onClick={() => {
                  refreshPage();
                }}
                variant="outlined"
              >
                {"Limpar Formulário"}
              </ButtonAtom>
            )}
            <ButtonAtom
              disabled={!canContinue || loading}
              onClick={() => {
                handleValidateFields()
                  .then((response) => {
                    if (response) {
                      onCallBack();
                    }
                    // scrollToTop();
                  })
              }}
            >
              {loading ? <CircularProgress size={24} /> : actionBtnLabel}
            </ButtonAtom>
          </RowAtom>
        </ColumnAtom>
      </RowAtom>
    </GridAtom>
  );
};
