export const baseURL =
  "https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.app.github.dev";
export const api = (page, option = {}) => {
  const token = localStorage.getItem("@orsystem:token") || "";
  console.log(token);
  if (!option?.headers) option.headers = { Authorization: `Bearer ${token}` };
  else option.headers = { ...option.headers, Authorization: `Bearer ${token}` };

  return fetch(`${baseURL}/api${page}`, option);
};
