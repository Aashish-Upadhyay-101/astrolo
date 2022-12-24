export const setTokenLocal = (token: string) => {
  localStorage.setItem("Token", token);
};

export const getTokenLocal = () => {
  const token = localStorage.getItem("Token") || "";
  console.log(token);

  return token ? JSON.parse(token) : "";
};

export const getAccessToken = () => {
  console.log(getTokenLocal());
  return getTokenLocal().access;
};

export const getRefreshToken = () => {
  return getTokenLocal().refresh;
};
