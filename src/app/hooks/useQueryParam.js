import React from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParam = (key) => {
  const [params, setParams] = useSearchParams();

  const changeQueryParam = (key, value) => {
    params.set(key, value);
    setParams(params);
  };
  return {
    value: params.get(key),
    changeQueryParam,
  };
};
