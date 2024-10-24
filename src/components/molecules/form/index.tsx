import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { GroupConstructor, FormActions } from "./components";
import useGroupVisibility from "./hook/useGroupVisibility";
import { validateFields } from "./lib/validateFields";
import { ErrorFrormType, FormModuleProps, PreDataType } from "./type";
import GridAtom from "../../atoms/grid";
import './style.css'

export const FormModule = ({
  actionBackBtnLabel,
  externalApproval,
  additionalFields,
  actionBtnLabel,
  groupsFields,
  onGoBackCallBack,
  onCallBack,
  keysList,
  info,
  loading,
  error: externalError,
  variant,
}: FormModuleProps) => {
  const [preData, setPreData] = useState<PreDataType | null>(null);
  const [error, setError] = useState<ErrorFrormType[] | null>(
    externalError ?? null
  );

  const visibleGroups = useGroupVisibility({
    groupsFields,
    keys: keysList ?? [],
    preData,
  });

  const handleFormActions = () => {
    onCallBack(preData);
  };

  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  return (
    <Box
      className={`Variant_${variant}`}
      component="form"
      id="main_searchPackages_form"
      sx={{
        "& .MuiTextField-root": { m: 0, width: "100%" },
      }}
      style={{ width: "100%" }}
      noValidate={false}
      autoComplete="on"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          validateFields(visibleGroups, preData).then((response) => {
            // setError(response);
          });
        }
      }}
    >
      <GridAtom gap={8} style={{ width: "100%" }}>
        <GroupConstructor
          errorForm={error ? error[0] : null}
          setPreData={setPreData}
          groupsFields={visibleGroups}
        />
        {info}
        {additionalFields}
        <FormActions
          error={error}
          formData={preData}
          groupsFields={visibleGroups}
          onCallBack={handleFormActions}
          actionBtnLabel={actionBtnLabel}
          actionBackBtnLabel={actionBackBtnLabel}
          externalApproval={externalApproval ?? true}
          goBack={onGoBackCallBack}
          loading={loading!}
        />
      </GridAtom>
    </Box>
  );
};
