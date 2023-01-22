export const setTokenLocal = (token: string) => {
  localStorage.setItem("Token", token);
};

export const getTokenLocal = () => {
  const token = localStorage.getItem("Token") || "";

  return token ? JSON.parse(token) : "";
};

export const getAccessToken = () => {
  return getTokenLocal().access;
};

export const getRefreshToken = () => {
  return getTokenLocal().refresh;
};

export const removeTokens = () => {
  localStorage.removeItem("Token");
};
