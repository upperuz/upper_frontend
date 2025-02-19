import { LogOutIcon } from 'components/icons';
import { useAppRouter, useAuth } from 'hooks';
import { FC } from 'react';

import classes from './LogOut.module.scss';

export const LogOut: FC<{ className: string }> = ({ className }) => {
  const { unauthenticate } = useAuth();
  const router = useAppRouter();

  const clickHandler = () => {
    unauthenticate();
    router.push('/');
  };

  return (
    <button className={`${classes.root} ${className}`} onClick={clickHandler}>
      <div className={classes['icon-container']}>
        <LogOutIcon width={24} height={24} />
      </div>
      <p className={classes.text}>Profildan chiqish</p>
    </button>
  );
};
