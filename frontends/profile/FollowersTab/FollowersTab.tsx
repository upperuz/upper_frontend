import { Follower } from 'components';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect } from 'react';
import { useLazyGetCurrentBlogFollowersQuery } from 'store/apis';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

export const FollowersTab: FC = () => {
  const {
    query: { tab },
  } = useRouter();
  const [fetchFollowers, { data: followers, isLoading, isFetching, isError, error }] =
    useLazyGetCurrentBlogFollowersQuery();

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.followers) {
      fetchFollowers();
    }
  }, [tab]);

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (followers && followers.length > 0)
    return (
      <div>
        {followers?.map((follower) => (
          <Fragment key={follower.id}>
            <Follower {...follower} className='px-3 py-2' />
          </Fragment>
        ))}
      </div>
    );

  return <p className='text-center'>Kuzatuvchilar yo`q</p>;
};
