import { Pagination } from "@mui/material";
import React from "react";

export const Paginate = ({
  totalPages,
  currentPage,
  changeQuery,
  queryKey,
}) => {
  return (
    <Pagination
      count={totalPages}
      page={+currentPage}
      onChange={(_, value) => {
        changeQuery(queryKey, value);
      }}
    />
  );
};
