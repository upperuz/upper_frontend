import { TRootState } from 'store/store';
import { TAuthStatus } from 'types';

export const getAuthStatus = (store: TRootState): TAuthStatus => store.auth.status;

export const getIsAuthenticated = (store: TRootState): boolean => store.auth.isAuthenticated;
