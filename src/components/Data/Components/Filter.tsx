import React from "react";
import "./Filter.css";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  filter: any;
  onChange: (data: any) => void;
  selected: any;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const Filter = ({
  filter,
  onChange,
  selected,
  setSearchValue,
  searchValue,
}: Props) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="hotelSearchFilterBox">
      {filter.key !== "search" && (
        <div
          className="filterBox"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <div className="filterBoxName">{filter.name}</div>
          <div className="filterBoxBtn">
            <span
              className={
                open ? "filterBoxBtnVertical active" : "filterBoxBtnVertical"
              }
            />
          </div>
        </div>
      )}

      {filter.key === "search" ? (
        <InputBase
          sx={{
            width: "100%",
            p: 1,
            paddingLeft: "15px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            borderRadius: 3,
          }}
          onKeyDown={(event) => {
            if (event.key.toLowerCase() === "enter" && searchValue) {
              onChange({ search: searchValue });
            }
          }}
          endAdornment={
            <SearchIcon
              onClick={() => {
                onChange({ search: searchValue });
              }}
              style={{
                position: "absolute",
                top: 5,
                right: 10,
                bottom: 0,
                margin: "auto",
                cursor: "pointer",
              }}
            />
          }
          placeholder="Փնտրել"
          value={searchValue || ""}
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(event) => {
            if (!event.target.value) {
              onChange({ search: "" });
            }
            setSearchValue(event.target.value);
          }}
        />
      ) : (
        <div
          className="filterBoxMenuItems"
          style={{ display: open ? "flex" : "none" }}
        >
          {filter.values.map((item: any, index: number) => (
            <label className="filterBoxInput" key={index}>
              <input
                type={filter.type}
                name={filter.type === "radio" ? `${filter.name}` : ""}
                value={item.value}
                checked={
                  filter.key !== "color"
                    ? selected === item.value
                    : selected?.length
                    ? selected?.includes(item.value)
                    : false
                }
                onChange={() => {
                  onChange({ [filter.key]: item.value });
                }}
              />
              <span
                className={filter.type === "radio" ? "fake" : "fakeCheck"}
              />
              {item.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
