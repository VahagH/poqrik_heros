import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { CaseInputProps } from "../../support/types";

export const CaseInputTypes = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
};

const CaseInput = ({
  onChange,
  label,
  value,
  name,
  type,
  isRequired = true,
  minStringLength = 3,
  fullWidth = true,
  autoFocus = true,
  helperText,
  disabled,
  error,
  onlyRead = false,
}: CaseInputProps) => {
  switch (type) {
    case "text":
      return (
        <TextValidator
          variant="outlined"
          margin="dense"
          fullWidth={fullWidth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.name, event.target.value);
          }}
          label={label}
          name={name}
          value={value || ""}
          autoFocus={autoFocus}
          validators={
            isRequired
              ? ["required", `minStringLength: ${minStringLength}`]
              : []
          }
          errorMessages={
            isRequired
              ? ["Դաշտը պարտադիր է.", `Մին․ ${minStringLength} նիշ`]
              : []
          }
          error={error}
          inputProps={{
            autoComplete: "nope",
            readOnly: onlyRead,
          }}
          helperText={helperText}
          disabled={disabled}
        />
      );
    case "number":
      return <div></div>;
    case "password":
      return <div></div>;
    case "email":
      return <div></div>;
    default:
      return null;
  }
};

export default CaseInput;
