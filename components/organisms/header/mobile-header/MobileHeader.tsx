import { ApiErrorBoundary } from 'components/ApiErrorBoundary';
import { Input } from 'components/form';
import { Logo, PrevIcon, SearchIcon } from 'components/icons';
import { Link, Spinner } from 'components/lib';
import { useTheme } from 'hooks';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useSearch } from 'store/clients/published-article';
import { debouncer } from 'utils/debouncer';

import classes from './MobileHeader.module.scss';

const inputDebounce = debouncer<string>(400);

export const MobileHeader = (): JSX.Element => {
  const { themeColors } = useTheme();
  const [isSearchUiVisible, setIsSearchUiVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const { data, ...res } = useSearch(inputValue);

  const searchUiVisibleHandler = useCallback(
    (value: boolean) => () => setIsSearchUiVisible(value),
    [],
  );

  const inputChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    inputDebounce(event.target.value?.trim(), setInputValue);
  }, []);

  const searchIconClickHandler = useCallback(() => {
    searchUiVisibleHandler(true)();
    searchInputRef.current?.focus();
  }, [searchUiVisibleHandler, searchInputRef.current]);

  const searchUI = useMemo(() => {
    return (
      <div className={`${classes['search-container']} ${!isSearchUiVisible && classes.hidden}`}>
        <span onClick={searchUiVisibleHandler(false)}>
          <PrevIcon color={themeColors.icon} />
        </span>
        <Input
          className={classes['search-input']}
          rootClassName='w-100'
          ref={searchInputRef}
          onChange={inputChangeHandler}
        />
      </div>
    );
  }, [
    searchUiVisibleHandler,
    searchInputRef,
    isSearchUiVisible,
    inputChangeHandler,
    themeColors.icon,
  ]);

  return (
    <header className={`${classes.header} container`}>
      {searchUI}
      {!isSearchUiVisible && (
        <>
          <Link href='/' className={classes.logo}>
            <Logo color={themeColors.icon} />
          </Link>
          <span onClick={searchIconClickHandler} className={classes['search-icon']}>
            <SearchIcon width={24} height={24} color={themeColors.icon} />
          </span>
        </>
      )}
      {isSearchUiVisible && (
        <ApiErrorBoundary res={res} fallback={<Spinner />} className={classes['results-container']}>
          <ul className='p-0 m-0'>
            {data?.map((article) => (
              <li key={article.id}>
                <Link href={`/articles/${article.id}`} className={classes.item}>
                  <span dangerouslySetInnerHTML={{ __html: article.title }} />
                </Link>
              </li>
            ))}
          </ul>
        </ApiErrorBoundary>
      )}
    </header>
  );
};
