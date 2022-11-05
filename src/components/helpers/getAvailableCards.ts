export const getCards = () => {
  const cachedCards = localStorage?.getItem("cards") as any;

  return cachedCards ? JSON.parse(cachedCards) : [];
};
