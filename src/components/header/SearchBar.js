import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  queryProducts,
  setSearchProducts,
} from "../../redux/slices/productSlice";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const searchResults = useSelector((state) => state.product.searchProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (inputValue) {
        dispatch(queryProducts(inputValue));
      } else {
        dispatch(setSearchProducts([]));
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);
  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300 }}
      disableClearable
      options={searchResults}
      getOptionLabel={(option) => option.name || ""}
      renderOption={(props, option) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            to={`/products/categories/${option.category}/${option.name}`}
            key={option._id}
            state={{ id: option._id }}
          >
            <Box style={{ display: "flex" }}>
              <Typography>{option.name}</Typography>-
              <Typography>{option.price} Gel</Typography>
            </Box>
          </Link>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label="Search "
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default SearchBar;
