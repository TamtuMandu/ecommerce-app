import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useQueryParam } from "../../../app/index";
import {
  fetchCategoryProduct,
  useCategoryProducts,
  useProductLoading,
} from "../../../redux";
import { Loading } from "../../loading";
import CategoryProductList from "./CategoryProductList";
import { Paginate } from "./Paginate";
import { Sort } from "./Sort";

export const CategoryProduct = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const categoryProducts = useCategoryProducts();
  const loading = useProductLoading();
  const { value: page, changeQueryParam: changePage } = useQueryParam("page");
  const { value: sort, changeQueryParam: changeSort } = useQueryParam("sort");

  useEffect(() => {
    dispatch(
      fetchCategoryProduct(`${categoryName}?page=${page}&size=2&sort=${sort}`)
    );
  }, [categoryName, page, sort]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Sort sort={sort} changeSort={changeSort} changePage={changePage} />
      <CategoryProductList />
      <Paginate
        totalPages={categoryProducts.totalPages}
        currentPage={page}
        changeQuery={changePage}
        queryKey="page"
      />
    </Box>
  );
};
