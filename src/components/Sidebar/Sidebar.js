import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";

const StyleListItem = styled(ListItem)(() => ({
  padding: "5px 0px 3px 15px",
  margin: "0px",
}));

const Sidebar = () => {
  const sidebarItems = useSelector((state) => state.product.categories);
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: true ? "255px" : "50px",
          height: "95%",
        },
      }}
      open={true}
    >
      <SidebarHeader isDrawerOpen={true} />
      <List>
        {sidebarItems.map((sidebarItem) => {
          const { name } = sidebarItem;
          return (
            <React.Fragment key={name}>
              <Link
                to={`/products/categories/${name}?page=1&sort=price,asc`}
                className="sidebar-item"
              >
                <Box sx={{ display: "flex " }}>
                  <StyleListItem>
                    <ListItemText secondary={name} sx={{ display: "block" }} />
                  </StyleListItem>
                </Box>
              </Link>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
