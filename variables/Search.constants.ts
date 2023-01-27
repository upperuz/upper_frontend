import { ArticlesTab, BlogsTab } from 'frontends/search';
import { ITabBody, ITabHeader, TIcon } from 'types';

export const SEARCH_PAGE_TAB_IDS = {
  articles: 'articles',
  tutorials: 'tutorials',
  blogs: 'blogs',
};

export const SEARCH_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: SEARCH_PAGE_TAB_IDS.articles,
  },
  {
    name: "To'plamlar",
    id: SEARCH_PAGE_TAB_IDS.tutorials,
  },
  {
    name: 'Bloglar',
    id: SEARCH_PAGE_TAB_IDS.blogs,
  },
];

export const SEARCH_TABS: ITabBody = {
  [SEARCH_PAGE_TAB_IDS.articles]: ArticlesTab,
  [SEARCH_PAGE_TAB_IDS.blogs]: BlogsTab,
};

export const SEARCH_PAGE_ARTICLE_ICONS: TIcon[] = ['save'];
