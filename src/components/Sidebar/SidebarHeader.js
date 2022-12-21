import { Button, Divider, Toolbar } from "@mui/material";
import React from "react";

const SidebarHeader = ({ isDrawerOpen }) => {
  return (
    <>
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: `${isDrawerOpen ? "space-between" : "center"}`,
        }}
        style={{ padding: `0 0 0 ${isDrawerOpen ? "15px" : "0"}` }}
      >
        <Button>Navigation</Button>
      </Toolbar>
      <Divider />
    </>
  );
};

export default SidebarHeader;
