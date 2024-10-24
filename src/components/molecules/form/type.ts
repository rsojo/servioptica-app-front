

export type FieldsTypes =
  | "text"
  | "select"
  | "radio"
  | "check"
  | "textarea"
  | "number"
  | "date"
  | "email"
  | "phone"
  | "tel"
  | "password";

type FieldsColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type OptionsTypes = {
  value: string;
  option: string;
};

export interface FieldsStructure {
  id: number | string;
  label: string;
  name: string;
  type: FieldsTypes | string;
  columnSize: FieldsColumn | number;
  important: boolean;
  options: OptionsTypes[] | null;
  default: any;
  placeholder: string;
  textError: string;
  minlength: number;
  maxlength: number;
}

export interface GroupFields {
  id: number;
  groupName: string;
  className?: string;
  title?: string;
  subTitle?: string;
  key?: string;
  fields: Array<Partial<FieldsStructure>>;
}

export type FieldsValueType =
  | string
  | number
  | boolean
  | { [key: string]: boolean }

export type PreDataType = {
  [key: string]: FieldsValueType;
} | null;

export type GroupedDataType = {
  [key: string]: any[];
};

export type ErrorStructure = {
  groupId: number | string;
  fieldId: number | string;
  fieldName?: string;
  errorMessage: string;
};
export type ErrorFrormType = null | ErrorStructure;

export interface FormModuleProps {
  variant?: 'form' | 'login'
  error?: ErrorFrormType[] | null
  actionBtnLabel?: string;
  actionBackBtnLabel?: string;
  onCallBack: (data: PreDataType) => void;
  onGoBackCallBack?: () => void;
  groupsFields: GroupFields[];
  info?: React.ReactNode;
  keysList?: string[];
  additionalFields?: React.ReactNode;
  externalApproval?: boolean;
  loading?: boolean
}
