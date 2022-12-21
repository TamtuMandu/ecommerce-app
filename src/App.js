import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components/header";
import Sidebar from "./components/Sidebar/Sidebar";
import { fetchCard, fetchHomePageProduct } from "./redux";
import { GenerateRoutes } from "./Routes";
import "./App.css";

const StyledContentContainer = styled(Box)(() => ({
  padding: "20px 0px 20px 40px",
  marginTop: "50px",
}));
const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(fetchHomePageProduct());
    if (userInfo) {
      dispatch(fetchCard(userInfo._id));
    }
  }, []);
  return (
    <Box>
      <Sidebar />
      <Box
        sx={{
          width: "calc(100% - 255px)",
          marginLeft: "255px",
        }}
      >
        <Header />
        <StyledContentContainer>{GenerateRoutes()}</StyledContentContainer>
      </Box>
    </Box>
  );
};

export default App;
