import { AppBar, Badge, Button, styled, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import UserIcon from "./UserIcon";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { CardDrawer } from "./CardDrawer";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useCardItems } from "../../redux";

const StyledAppBar = styled(AppBar)(() => ({
  background: "#fff",
  color: "#103B66",
  width: "calc(100% - 255px)",
  padding: "0 100px 0 13px",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  width: "10%",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    width: "20px",
    height: "21px",
    color: "#fff",
    background: "#F33451",
    top: "2px",
    right: "-3px",
  },
}));

export const Header = () => {
  const cardItems = useCardItems();

  const cardItemsQuantitySum = cardItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const [isCardDrawerOpen, setIsCardDrawerOpen] = useState(false);
  return (
    <>
      <StyledAppBar>
        <StyledToolBar>
          <Link to="/">
            <AiOutlineHome size={35} color={"royalBlue"} />
          </Link>
          <SearchBar />
          <StyledBox>
            <UserIcon />
            <Button onClick={() => setIsCardDrawerOpen(true)}>
              <StyledBadge badgeContent={cardItemsQuantitySum}>
                <AiOutlineShoppingCart size={35} />
              </StyledBadge>
            </Button>
            <CardDrawer
              open={isCardDrawerOpen}
              onClose={() => {
                setIsCardDrawerOpen(false);
              }}
            />
          </StyledBox>
        </StyledToolBar>
      </StyledAppBar>
    </>
  );
};
