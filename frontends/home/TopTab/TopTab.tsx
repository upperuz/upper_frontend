import { ApiErrorBoundary, Article } from 'components';
import { FC } from 'react';
import { useGetTopArticlesQuery } from 'store/apis';
import { SEARCH_PAGE_ARTICLE_ACTIONS, SEARCH_PAGE_ARTICLE_ICONS } from 'variables';

export const TopTab: FC = () => {
  const res = useGetTopArticlesQuery();

  return (
    <ApiErrorBoundary res={res} className='tab'>
      {res.data?.map((article) => (
        <Article
          className='p-2'
          key={article.id}
          article={article}
          author={article.author}
          actions={SEARCH_PAGE_ARTICLE_ACTIONS}
          icons={SEARCH_PAGE_ARTICLE_ICONS}
        />
      ))}
    </ApiErrorBoundary>
  );
};
