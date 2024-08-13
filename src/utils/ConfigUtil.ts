export const getBaseUrl = () => {
  const { REACT_APP_FOODIEDELIGHT_API_BASE_URL } = process.env;
  return REACT_APP_FOODIEDELIGHT_API_BASE_URL;
};
