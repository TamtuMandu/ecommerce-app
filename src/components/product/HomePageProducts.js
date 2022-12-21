import React from "react";
import { useSelector } from "react-redux";
import { useProductLoading } from "../../redux";
import { GridComponent } from "../grid";
import { Loading } from "../loading";
import ProductCard from "./ProductCard";

const HomePageProducts = () => {
  const homePageProducts = useSelector(
    (state) => state.product.homePageProducts
  );
  const loading = useProductLoading();

  if (loading) {
    return <Loading />;
  }
  return (
    <GridComponent>
      {homePageProducts.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </GridComponent>
  );
};
export default HomePageProducts;
