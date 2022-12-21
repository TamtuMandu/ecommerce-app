import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../app/index";
import { addToCard, removeFromCard, useCardItems } from "../../redux";
import { setSelectedProduct } from "../../redux/slices/productSlice";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const ProductCard = ({
  name,
  _id,
  image,
  price,
  category,
  brand,
  description,
}) => {
  const cardItems = useCardItems();
  const isProductInCard = cardItems?.find((item) => item.product._id === _id);
  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEdit = () => {
    dispatch(
      setSelectedProduct({
        product: { name, _id, image, price, category, brand, description },
      })
    );
    navigate(`/products/edit/${name}`);
  };

  return (
    <Grid item sm={12} md={4}>
      <Card sx={{ width: "300px", height: "400px" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/products/categories/${category}/${name}`}
          state={{ id: _id }}
        >
          <img
            src={image}
            width="100%"
            height="250px"
            style={{ objectFit: "cover" }}
            alt={name}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <StyledBox>
              <Typography variant="subtitle1" color="royalBlue">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="grey">
                {price} Gel
              </Typography>
            </StyledBox>
          </CardContent>
        </Link>

        <CardActions>
          <StyledBox>
            {isProductInCard ? (
              <>
                <Button onClick={() => dispatch(removeFromCard(_id))}>-</Button>
                <Typography>{isProductInCard?.quantity}</Typography>
                <Button
                  onClick={() => dispatch(addToCard({ _id, price, name }))}
                >
                  +
                </Button>
              </>
            ) : (
              <Button onClick={() => dispatch(addToCard({ _id, price, name }))}>
                Add To Card
              </Button>
            )}
            {isUserAdmin(userInfo) && <Button onClick={onEdit}>Edit</Button>}
          </StyledBox>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
