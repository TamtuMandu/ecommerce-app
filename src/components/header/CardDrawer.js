import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCard, saveCard, useCardItems } from "../../redux";

export const CardDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const cardItems = useCardItems();

  return (
    <>
      <Drawer open={open} onClose={onClose} anchor="right">
        {cardItems.map((cardItem) => {
          const { product, quantity } = cardItem;
          return (
            <Box
              key={product._id}
              sx={{
                width: 300,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Typography>{product.name}</Typography>
              <Typography>x{quantity}</Typography>
              <Typography>{product.price * quantity}</Typography>

              <Divider />
            </Box>
          );
        })}

        <Button
          onClick={() => {
            dispatch(clearCard());
            onClose();
          }}
        >
          Clear Card
        </Button>

        {!!userInfo && (
          <Button
            onClick={() => {
              dispatch(saveCard({ cardItems, userId: userInfo._id }));
            }}
          >
            Save card
          </Button>
        )}
      </Drawer>
    </>
  );
};
