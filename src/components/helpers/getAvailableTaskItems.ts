export const getItems = () => {
  const cachedTasks = localStorage?.getItem("items") as any;

  return cachedTasks ? JSON.parse(cachedTasks) : [];
};
