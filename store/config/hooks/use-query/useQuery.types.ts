interface IQueryConfig {
  enabled?: boolean;
}

interface IQeuryResult<TData> {
  data?: TData;
  error: unknown;
  failureCount: number;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isPlaceholderData: boolean;
  isPreviousData: boolean;
  isRefetchError: boolean;
  isRefetching: boolean;
  isStale: boolean;
  isSuccess: boolean;
  refetch: () => void;
  remove: () => void;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TQueryHook<TData = unknown> = (config?: IQueryConfig) => IQeuryResult<TData>;
