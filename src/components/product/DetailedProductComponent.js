import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useProductLoading } from "../../redux";
import { fetchSingleProductById } from "../../redux/slices/productSlice";
import { Loading } from "../loading";

const DetailedProductComponent = () => {
  const { state } = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.product.singleProduct);
  const loading = useProductLoading();
  useEffect(() => {
    dispatch(
      fetchSingleProductById({ id: state.id, category: params.categoryName })
    );
  }, [state.id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <img src={singleProduct?.image} alt="" width={"450px"} height="450px" />
      <h1 style={{ color: "grey" }}> {singleProduct?.name}</h1>
      <h1 style={{ color: "royalBlue" }}> {singleProduct?.price}</h1>
      <h1 style={{ color: "darkGrey" }}> {singleProduct?.description}</h1>
    </>
  );
};

export default DetailedProductComponent;
