import { CircularProgress } from "@mui/material";
import React from "react";

export const Loading = ({ color = "primary", size = 50 }) => {
  return <CircularProgress color={color} size={size} />;
};
