declare module "react-easy-edit" {
  import * as React from "react";

  export interface EasyEditProps {
    type: "text" | "textarea" | "number" | "date" | "time" | "select";
    onSave: (value: any) => void;
    onCancel?: () => void;
    value: any;
    saveButtonLabel?: string;
    cancelButtonLabel?: string;
    attributes?: object;
    instructions?: string;
    placeholder?: string;
    validationMessage?: string;
    allowEdit?: boolean;
    viewAttributes?: object;
    editAttributes?: object;
    options?: Array<{ label: string; value: any }>;
    hideIcons?: boolean;
    buttonsPosition?: "before" | "after";
    saveButtonStyle?: object;
    cancelButtonStyle?: object;
    saveButtonClassName?: string;
    cancelButtonClassName?: string;
    validation?: (value: any) => boolean;
  }

  const EasyEdit: React.FC<EasyEditProps>;

  export default EasyEdit;
  export const Types: {
    TEXT: "text";
    TEXTAREA: "textarea";
    NUMBER: "number";
    DATE: "date";
    TIME: "time";
    SELECT: "select";
  };
}
