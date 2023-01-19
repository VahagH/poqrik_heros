import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { CaseInputProps } from "../../support/types";
import ReactInputMask from "react-input-mask";
import { Autocomplete } from "@mui/material";
import UploadImages from "../UploadImages";

export const CaseInputTypes = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
  TELEPHONE: "telephone",
  AUTOCOMPLETE: "autocomplete",
  TEXTAREA: "textarea",
  UPLOAD_IMAGES: "upload",
};

const CaseInput = ({
  onChange,
  label,
  value,
  name,
  type,
  isRequired = true,
  minStringLength = 0,
  fullWidth = true,
  autoFocus,
  jsType,
  placeHolder,
  mask = "9999999999999999",
  helperText,
  disabled,
  error,
  multiple,
  onlyRead = false,
  options,
  confirming = false,
}: CaseInputProps) => {
  const newLabel = isRequired ? (
    <>
      {label} <span style={{ fontSize: 17, color: "red" }}>*</span>
    </>
  ) : (
    <>{label}</>
  );
  switch (type) {
    case CaseInputTypes.UPLOAD_IMAGES:
      return (
        <UploadImages
          label={newLabel}
          multiple={multiple}
          handleSubmit={onChange}
          name={name}
          disable={disabled}
          value={value}
          error={error}
          helperText={helperText}
        />
      );
    case CaseInputTypes.TEXT:
      return (
        <TextValidator
          variant="outlined"
          margin="dense"
          fullWidth={fullWidth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.name, event.target.value);
          }}
          label={newLabel}
          name={name}
          value={value || ""}
          autoComplete="no"
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
          placeholder={placeHolder}
          inputProps={{
            autoComplete: "no",
            readOnly: onlyRead,
          }}
          helperText={helperText}
          disabled={disabled}
        />
      );
    case CaseInputTypes.NUMBER:
      return (
        <ReactInputMask
          mask={mask}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(
              event.target.name,
              jsType === "number" ? +event.target.value : event.target.value
            );
          }}
          value={value || ""}
          maskChar={null}
          disabled={disabled}
        >
          {/*  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore */}
          {() => (
            <TextValidator
              variant="outlined"
              margin="dense"
              fullWidth={fullWidth}
              label={newLabel}
              name={name}
              placeholder={placeHolder}
              value={value || ""}
              autoFocus={autoFocus}
              validators={isRequired ? ["required"] : []}
              errorMessages={isRequired ? ["Դաշտը պարտադիր է."] : []}
              error={error}
              helperText={helperText}
            />
          )}
        </ReactInputMask>
      );
    case CaseInputTypes.PASSWORD:
      return (
        <TextValidator
          variant="outlined"
          margin="dense"
          fullWidth={fullWidth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.name, event.target.value);
          }}
          label={newLabel}
          name={name}
          value={value || ""}
          autoFocus={autoFocus}
          validators={
            confirming
              ? [
                  "required",
                  `minStringLength: ${minStringLength}`,
                  "isPasswordMatch",
                ]
              : ["required", `minStringLength: ${minStringLength}`]
          }
          errorMessages={
            confirming
              ? [
                  "Դաշտը պարտադիր է.",
                  `Մին․ ${minStringLength} նիշ`,
                  "Գաղտնաբառը չի համապատասխանում",
                ]
              : ["Դաշտը պարտադիր է.", `Մին․ ${minStringLength} նիշ`]
          }
          autoComplete="new-password"
          error={error}
          placeholder={placeHolder}
          helperText={helperText}
          disabled={disabled}
          type="password"
        />
      );
    case CaseInputTypes.EMAIL:
      return (
        <TextValidator
          variant="outlined"
          margin="dense"
          fullWidth={fullWidth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.name, event.target.value);
          }}
          label={newLabel}
          name={name}
          value={value || ""}
          autoFocus={autoFocus}
          validators={isRequired ? ["required", "isEmail"] : []}
          errorMessages={
            isRequired ? ["Դաշտը պարտադիր է.", "Սխալ էլ․ հասցե"] : []
          }
          error={error}
          helperText={helperText}
          disabled={disabled}
        />
      );
    case CaseInputTypes.AUTOCOMPLETE:
      return (
        <Autocomplete
          value={value || null}
          onChange={(event: any, option: any) => {
            const newValue = option?.value;
            onChange(name, newValue || null);
          }}
          options={options || []}
          getOptionLabel={(option) => {
            return (
              option.name ||
              options?.find((el: any) => el.value === option)?.name ||
              ""
            );
          }}
          isOptionEqualToValue={(option: any, value: any) => {
            return option?.value === value;
          }}
          noOptionsText="No data"
          disabled={disabled}
          renderInput={(params) => (
            <TextValidator
              {...params}
              label={newLabel}
              value={value || null}
              name={name}
              variant="outlined"
              margin="dense"
              placeholder={placeHolder}
              inputProps={{
                ...params.inputProps,
                autoComplete: "nope",
              }}
              fullWidth={fullWidth}
              validators={isRequired && !value ? ["required"] : []}
              errorMessages={isRequired && !value ? ["Դաշտը պարտադիր է."] : []}
              error={error}
              helperText={helperText}
            />
          )}
        />
      );
    case CaseInputTypes.TELEPHONE:
      return (
        <ReactInputMask
          mask="+9999999999999"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.name, event.target.value.replace(/\s/g, ""));
          }}
          value={value || ""}
          maskChar={null}
          disabled={disabled}
        >
          {/*  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore */}
          {() => (
            <TextValidator
              variant="outlined"
              margin="dense"
              fullWidth={fullWidth}
              label={newLabel}
              value={value || ""}
              name={name}
              placeholder={placeHolder}
              autoFocus={autoFocus}
              validators={isRequired ? ["required"] : []}
              errorMessages={isRequired ? ["Դաշտը պարտադիր է."] : []}
              error={error}
              helperText={helperText}
            />
          )}
        </ReactInputMask>
      );
    case CaseInputTypes.TEXTAREA:
      return (
        <TextValidator
          variant="outlined"
          margin="dense"
          fullWidth={fullWidth}
          multiline
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.name, event.target.value);
          }}
          label={newLabel}
          name={name}
          value={value || ""}
          autoFocus={autoFocus}
          placeholder={placeHolder}
          validators={isRequired ? ["required"] : []}
          errorMessages={isRequired ? ["Դաշտը պարտադիր է."] : []}
          error={error}
          inputProps={{
            readOnly: onlyRead,
          }}
          helperText={helperText}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
};

export default CaseInput;
