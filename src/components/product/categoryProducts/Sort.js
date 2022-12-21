import { MenuItem, Select } from "@mui/material";
import React from "react";

export const Sort = ({ sort, changeSort, changePage }) => {
  return (
    <Select
      value={sort}
      onChange={(e) => {
        changePage("page", 1);
        changeSort("sort", e.target.value);
      }}
    >
      <MenuItem value="price,desc">ფასი კლებადობით</MenuItem>
      <MenuItem value="price,asc">ფასი ზრდადობით</MenuItem>
      <MenuItem value="name,asc">სახელი ზრდადობობით</MenuItem>
      <MenuItem value="name,desc">სახელი კლებადობით</MenuItem>
    </Select>
  );
};
