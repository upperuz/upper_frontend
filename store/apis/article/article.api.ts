import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IArticle,
  IArticleResult,
  IPagingResponse,
  TArticleStatus,
  TOptionalPagingRequest,
} from 'types';
import { PAGINATION_SIZE } from 'variables';

import { baseQuery } from '../config';
import { create, updateBlocks, updateLabels } from './article.endpoints';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    create: create(build),
    updateBlocks: updateBlocks(build),
    updateLabels: updateLabels(build),
    getBlogArticleById: build.query<IArticle, number>({
      query: (id: number) => `need-auth/${id}`,
    }),
    getBlogArticles: build.query<
      IPagingResponse<IArticleResult>,
      TOptionalPagingRequest<{ status?: TArticleStatus }>
    >({
      query: (params) => ({
        url: 'need-auth/list',
        params: {
          size: PAGINATION_SIZE,
          ...params,
        },
      }),
    }),
    publish: build.mutation<IArticle, { id: number; channelIds?: number[] }>({
      query: ({ id, ...body }) => ({
        url: `publish/${id}`,
        method: 'POST',
        body,
      }),
    }),
    delete: build.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
    }),
    search: build.query<IArticleResult[], { search: string }>({
      query: (params) => ({
        url: 'search',
        params,
      }),
    }),
  }),
});

export const {
  useCreateMutation: useCreateArticleMutation,
  useUpdateBlocksMutation: useUpdateArticleBlocksMutation,
  useUpdateLabelsMutation: useUpdateArticleLabelsMutation,
  useDeleteMutation: useDeleteArticleMutation,
  useLazySearchQuery: useLazySearchArticleQuery,
  usePublishMutation,
  useLazyGetBlogArticlesQuery,
  useLazyGetBlogArticleByIdQuery,
} = articleApi;
