import decode from "jwt-decode";

export const isUserAdmin = (userData) => {
  return userData ? userData.role.includes("admin") : null;
};

export const getUserInitials = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return "";
  }
  return `${firstName.charAt(0).toUpperCase()} ${lastName
    .charAt(0)
    .toUpperCase()}`;
};

export const checkTokenValidity = (token) => {
  const expirationDate = decode(token).exp;
  const isExpired = expirationDate * 1000 < new Date().getTime();
  return isExpired;
};
