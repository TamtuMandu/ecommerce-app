import React, { useEffect, useState } from "react";
import { useForm } from "../../app/index";
import { Button, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../../redux";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";

const generateAddProductFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 1 ? null : "Name Should Have At Least 3 Character",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      validateInput: (description) =>
        description.length > 1
          ? null
          : "Description Should Have At Least 2 Characters",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      validateInput: (category) =>
        category.length > 1
          ? null
          : "Category Should Have At Least 2 Characters",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      validateInput: (brand) =>
        brand.length > 1 ? null : "Brand Should Have At Least 2 Characters",
    },
    price: {
      value: selectedProduct?.price || 0,
      required: true,
      error: "",
      validateInput: (price) =>
        price > 0 ? null : " Price Should Be Positive Number",
    },
  };
};

const ProductForm = () => {
  const {
    formValues: productFormValues,
    onInputChange,
    setFormValues,
  } = useForm({
    defaultFormValues: generateAddProductFormValues(),
  });

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const saveProductHandler = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    dispatch(
      saveProduct({
        product: {
          name,
          description,
          category,
          price,
          brand,
          image,
          id: selectedProduct?._id,
        },
        isUpdating: !!selectedProduct,
      })
    )
      .unwrap()
      .then(() => {});

    navigate("/");
  };

  useEffect(() => {
    if (selectedProduct) {
      setFormValues(generateAddProductFormValues(selectedProduct));
      setImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  return (
    <FormControl fullWidth>
      <TextField
        name="name"
        value={productFormValues.name.value}
        onChange={onInputChange}
        error={!!productFormValues.name.error}
        helperText={productFormValues.name.error}
        label={"name"}
        margin="dense"
      />
      <TextField
        name="description"
        value={productFormValues.description.value}
        onChange={onInputChange}
        error={!!productFormValues.description.error}
        helperText={productFormValues.description.error}
        label={"description"}
        margin="dense"
      />
      <TextField
        name="category"
        value={productFormValues.category.value}
        onChange={onInputChange}
        error={!!productFormValues.category.error}
        helperText={productFormValues.category.error}
        label={"category"}
        margin="dense"
      />
      <TextField
        name="brand"
        value={productFormValues.brand.value}
        onChange={onInputChange}
        error={!!productFormValues.brand.error}
        helperText={productFormValues.brand.error}
        label={"brand"}
        margin="dense"
      />
      <TextField
        name="price"
        type="number"
        value={productFormValues.price.value}
        onChange={onInputChange}
        error={!!productFormValues.price.error}
        helperText={productFormValues.price.error}
        label={"price"}
        margin="dense"
      />
      <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImage(base64)}
      />

      <Button onClick={saveProductHandler}>Save</Button>
    </FormControl>
  );
};

export default ProductForm;
