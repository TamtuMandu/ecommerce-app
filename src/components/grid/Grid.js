import { Grid } from "@mui/material";
import React from "react";

export const GridComponent = ({ children }) => {
  return (
    <Grid container sx={{ width: "100%" }} spacing={2}>
      {children}
    </Grid>
  );
};
