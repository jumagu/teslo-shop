export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
): (string | number)[] => {
  // ? if totalPages <= 7 then show all 7 pages without ellipses
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // ? if currentPage is between the firts 3 pages
  // ? then show the first three pages, ellipses and the last two pages
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // ? if currentPage is between the last 3 pages
  // ? then show the first two pages, ellipses and the last three pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // ? if the current page is in the middle
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
