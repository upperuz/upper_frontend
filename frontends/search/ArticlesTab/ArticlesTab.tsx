import { Article } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazySearchArticleQuery } from 'store/apis';
import {
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
  SEARCH_PAGE_TAB_IDS,
} from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { search, tab },
  } = useRouter();
  const [searchArticle, searchArticleRes] = useLazySearchArticleQuery();

  useEffect(() => {
    if (search && search.length > 1 && tab === SEARCH_PAGE_TAB_IDS.articles) {
      searchArticle(search as string);
    }
  }, [search]);

  const articles = useMemo(() => {
    const { data: articles, isLoading, isFetching, isError, error, isSuccess } = searchArticleRes;
    if (isLoading || isFetching) return 'Loading...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    if (isSuccess) {
      return articles.map((article) => (
        <Article
          className='px-2 py-2'
          key={article.id}
          article={article}
          author={article.author}
          actions={SEARCH_PAGE_ARTICLE_ACTIONS}
          icons={SEARCH_PAGE_ARTICLE_ICONS}
        />
      ));
    }
  }, [searchArticleRes]);

  return <div className='tab'>{articles}</div>;
};
