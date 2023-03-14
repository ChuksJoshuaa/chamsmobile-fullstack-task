import { PostProps } from "./interface";

export const paginate = (items: PostProps[]) => {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(items.length / itemsPerPage);

  const newItems = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  });

  return newItems;
};
