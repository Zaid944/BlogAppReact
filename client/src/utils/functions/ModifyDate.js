export const modifyDate = (today) => {
  return (
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
  );
};