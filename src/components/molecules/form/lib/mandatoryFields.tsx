
export const mandatoryFields = (formData: any) => {
  if (
    formData?.check_in_dates?.uuid_id &&
    formData?.package_details?.uuid_id &&
    formData?.package_details.nights &&
    formData?.distributions?.length! > 0
  ) {
    return true;
  } else {
    return false;
  }
};
