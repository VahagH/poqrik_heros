import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { CaseInputProps } from "../../support/types";
import ReactInputMask from "react-input-mask";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UploadImages from "../UploadImages";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

export const CaseInputTypes = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
  TELEPHONE: "telephone",
  AUTOCOMPLETE: "autocomplete",
  MULTIPLE_AUTOCOMPLETE: "multiple_autocomplete",
  TEXTAREA: "textarea",
  UPLOAD_IMAGES: "upload",
  CHECKBOX: "checkbox",
  DATE_TIME: "date_time",
};

const CaseInput = ({
  onChange,
  onChangeFunc,
  formData,
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
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
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
    case CaseInputTypes.CHECKBOX:
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value === "yes"}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                val: any
              ) => {
                onChange("slider", val ? "yes" : "no");
              }}
            />
          }
          label={newLabel}
        />
      );
    case CaseInputTypes.TEXT:
      return (
        <TextValidator
          variant="outlined"
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
            if (onChangeFunc) {
              const dataObj = onChangeFunc(formData, event.target.value);
              if (dataObj) {
                for (let [key, value] of Object.entries(dataObj)) {
                  onChange(key, value);
                }
              }
            }
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
    case CaseInputTypes.DATE_TIME:
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            inputFormat="DD-MM-YYYY HH:mm"
            ampmInClock={false}
            ampm={false}
            disablePast
            renderInput={(props) => (
              <TextField
                {...props}
                variant="outlined"
                fullWidth={fullWidth}
                name={name}
                // value={value || null}
                // autoFocus={autoFocus}
                // validators={isRequired ? ["required", "isEmail"] : []}
                // errorMessages={
                //   isRequired ? ["Դաշտը պարտադիր է.", "Սխալ էլ․ հասցե"] : []
                // }
                error={error}
                helperText={helperText}
                disabled={disabled}
              />
            )}
            label={newLabel}
            value={value || null}
            onChange={(newValue) => {
              onChange(name, +newValue.format("X") * 1000);
            }}
          />
        </LocalizationProvider>
      );
    case CaseInputTypes.AUTOCOMPLETE:
      return (
        <Autocomplete
          includeInputInList={false}
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
              placeholder={placeHolder}
              fullWidth={fullWidth}
              validators={isRequired && !value ? ["required"] : []}
              errorMessages={isRequired && !value ? ["Դաշտը պարտադիր է."] : []}
              error={error}
              helperText={helperText}
            />
          )}
        />
      );
    case CaseInputTypes.MULTIPLE_AUTOCOMPLETE:
      return (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          value={value || []}
          options={options || []}
          onChange={(event: any, option: any) => {
            if (onChangeFunc) {
              const dataObj = onChangeFunc(formData, option);
              for (let [key, value] of Object.entries(dataObj)) {
                onChange(key, value);
              }
            }
            onChange(name, option || null);
          }}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(val, opt) => val.value === opt.value}
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{
                    marginRight: 8,
                  }}
                  checked={selected}
                />
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextValidator
              {...params}
              label={newLabel}
              name={name}
              value={value || null}
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
