import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInitials, isUserAdmin } from "../../app/index";
import { logoutUser } from "../../redux";

const UserIcon = () => {
  const [anchor, setAnchor] = useState(null);
  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <Box>
      <IconButton
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        <Avatar sx={{ bgolor: "royalblue" }}>
          {getUserInitials(userInfo?.firstName, userInfo?.lastName)}
        </Avatar>
      </IconButton>
      <Box>
        <Menu
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          <MenuItem>
            {isUserAdmin(userInfo) && (
              <Button
                onClick={() => {
                  navigate("/products/new");
                  handleClose();
                }}
              >
                {" "}
                Add Product{" "}
              </Button>
            )}
          </MenuItem>

          {!!userInfo ? (
            <Box>
              <MenuItem>
                <Button
                  onClick={() => {
                    dispatch(logoutUser())
                      .unwrap()
                      .then(() => {
                        navigate("/");
                        handleClose();
                      });
                  }}
                >
                  logout
                </Button>
              </MenuItem>
            </Box>
          ) : (
            <MenuItem>
              <Button
                onClick={() => {
                  navigate("/login");
                  handleClose();
                }}
              >
                login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                  handleClose();
                }}
              >
                register
              </Button>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default UserIcon;
