import { useNextAuth } from 'hooks/useNextAuth/useNextAuth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  authenticate as storeAuthenticate,
  getAuthStatus,
  getCurrentBlog,
  getIsAuthenticated,
  setCurrentBlog as setStoreCurrentBlog,
  unauthenticate as storeUnauthenticate,
} from 'store/states';
import { removeLocalStorageTokens, setLocalStorateTokens } from 'utils/auth/auth';
import { REFRESH_TOKEN, TOKEN } from 'variables';

import {
  IUseAuth,
  TAuthenticateFn,
  TAuthenticateTokensFn,
  TSetCurrentBlogFn,
} from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const dispatch = useAppDispatch();
  const { signIn, signOut } = useNextAuth();
  const status = useAppSelector(getAuthStatus);
  const currentBlog = useAppSelector(getCurrentBlog);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const isLoading = useMemo(() => status === 'loading', [status]);
  const {
    push,
    query: { redirect },
  } = useRouter();

  const authenticate: TAuthenticateFn = (data) => {
    setCurrentBlog(data);
    setLocalStorateTokens(data);
    dispatch(storeAuthenticate());
    signIn(data.token);
    if (typeof redirect === 'string') push(redirect);
  };

  const authenticateTokens: TAuthenticateTokensFn = (tokens) => {
    setLocalStorateTokens(tokens);
    dispatch(storeAuthenticate());
    signIn(tokens.token);
    if (typeof redirect === 'string') push(redirect);
  };

  const setCurrentBlog: TSetCurrentBlogFn = (blog) => {
    dispatch(setStoreCurrentBlog(blog));
  };

  const unauthenticate = (): void => {
    removeLocalStorageTokens();
    dispatch(storeUnauthenticate());
    signOut();
  };

  const getToken = (): string | null => {
    try {
      return localStorage.getItem(TOKEN);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getRefreshToken = (): string | null => {
    try {
      return localStorage.getItem(REFRESH_TOKEN);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return {
    status,
    isAuthenticated,
    isLoading,
    currentBlog,
    authenticate,
    unauthenticate,
    authenticateTokens,
    getToken,
    getRefreshToken,
    setCurrentBlog,
  };
};
