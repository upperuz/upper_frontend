import { Input } from 'components/form';
import { Spinner } from 'components/lib';
import { Comment } from 'components/molecules';
import { useRouter } from 'next/router';
import { FC, KeyboardEvent, useCallback, useRef } from 'react';
import { useCommentsList, useCreateComment } from 'store/clients/comments';
import { ICONS } from 'variables';

import classes from './CommentsModal.module.scss';

const SendIcon = ICONS.send;

export const CommentsModal: FC = () => {
  const { query } = useRouter();
  const articleId = +(query?.id as string);
  const { list: comments } = useCommentsList(articleId);
  const { mutate: createComment, isLoading: isCommentBeingCreated } = useCreateComment();
  const inputRef = useRef<HTMLInputElement>(null);

  const sendCommentHandler = useCallback(() => {
    const { current } = inputRef;
    if (!current) return;
    const value = current.value;
    if (!value.length) return;
    createComment({ articleId, text: value });
    current.value = '';
  }, [articleId]);

  const heyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      if (key === 'Enter') {
        sendCommentHandler();
      }
    },
    [sendCommentHandler],
  );

  return (
    <div className={classes.root}>
      <div className={classes.background} />
      <div className={classes.modal}>
        <div className={classes['modal-header']}>
          <p className={classes.headline}>Izohlar</p>
          <span className={classes['close-icon']}>&#x2715;</span>
        </div>
        <div className={classes['modal-body']}>
          {comments.map((comment) => (
            <Comment {...comment} key={comment.id} />
          ))}
        </div>
        <div className={classes['modal-footer']}>
          <div className={classes['comment-input-container']}>
            <Input
              ref={inputRef}
              rootClassName={classes['comment-input-root']}
              className={classes['comment-input']}
              onKeyDown={heyDownHandler}
            />
            <button
              className={classes['send-btn']}
              onClick={sendCommentHandler}
              disabled={isCommentBeingCreated}
            >
              {isCommentBeingCreated ? <Spinner /> : <SendIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
