import { useState } from 'react';

export enum Pages {
  HOME = 'Home',
  ABOUT = 'About',
  CONTACT = 'Contact',
}

export interface TabBarProps {
  currentPage: Pages;
  onChangePage: (page: Pages) => void;
}

export function useTabState(initialPage: Pages = Pages.HOME) {
  const [currentPage, setCurrentPage] = useState<Pages>(initialPage);

  // เปลี่ยนหน้า
  const changePage = (page: Pages) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    changePage,
    Pages, 
  };
}