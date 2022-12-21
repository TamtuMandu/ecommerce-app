import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { isUserAdmin, ProtectedRoute } from "./app/index";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProductFormPage,
  CategoryProductPage,
  SingleProductPage,
} from "./pages";

export const GenerateRoutes = () => {
  const userInfo = useSelector((state) => state.user.user);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute hasAccess={isUserAdmin(userInfo)}>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:name"
        element={
          <ProtectedRoute hasAccess={isUserAdmin(userInfo)}>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/categories/:categoryName"
        element={<CategoryProductPage />}
      />
      <Route
        path="/products/categories/:categoryName/:name"
        element={<SingleProductPage />}
      />
    </Routes>
  );
};
