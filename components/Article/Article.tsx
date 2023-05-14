import { ArticleImg, Author, Label, Status } from 'components';
import { Divider } from 'components/lib';
import { useTheme } from 'hooks';
import Link from 'next/link';
import { FC, useEffect, useMemo, useRef } from 'react';
import { addAmazonUri, dateInterval, formatToKMB, getClassName } from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

const CalendarIcon = ICONS.calendar;
const EyeIcon = ICONS.eye;
const LikeIcon = ICONS.like;

export const Article: FC<IArticleProps> = ({ article, author, redirectUrl, ...props }) => {
  const {
    title,
    content,
    updatedDate,
    publishedDate,
    viewCount,
    likeCount,
    labels = [],
    id,
    imgUrl,
    status,
  } = article;
  const { theme } = useTheme();
  const rootClassName = getClassName(classes.article, classes[theme], props.className);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentContainer = contentRef.current;
    const contentMaxChar = 500;
    if (contentContainer) {
      const span = document.createElement('span');
      span.innerHTML =
        content.length > contentMaxChar ? `${content.slice(0, contentMaxChar)}...` : content;
      contentContainer.appendChild(span);
    }
  }, [content]);

  const date: JSX.Element | string = useMemo(() => {
    if (updatedDate) return <>{dateInterval(updatedDate)} yangilangan</>;
    if (publishedDate) return dateInterval(publishedDate);
    return '';
  }, [updatedDate, publishedDate]);

  return (
    <div className={rootClassName}>
      <Link href={`${redirectUrl || `${WEB_APP_ROOT_DIR}/articles`}/${id}`}>
        <a>
          <div className={classes.body}>
            <div className={classes['text-content']}>
              <h2 className={classes.title} dangerouslySetInnerHTML={{ __html: title }} />
              <p className={classes.content} ref={contentRef} />
            </div>
            {imgUrl && <ArticleImg imgUrl={imgUrl} />}
          </div>
          <div className={classes.footer} style={{ marginTop: props.showStatus ? '0.5rem' : 0 }}>
            <div className={classes.stats}>
              {Boolean(date) && (
                <time style={{ flex: 1 }}>
                  <span className={classes.icon}>
                    <CalendarIcon color='gray' />
                  </span>
                  {date}
                </time>
              )}

              {viewCount > 0 && (
                <>
                  <Divider type='vertical' className='mx-1' />
                  <div className='d-flex align-items-center'>
                    <span className={`${classes.icon} ${classes.eye}`}>
                      <EyeIcon color='gray' />
                    </span>
                    <span className='d-flex align-items-center'>
                      {formatToKMB(viewCount)} marta o&apos;qilgan
                    </span>
                  </div>
                </>
              )}
              {props.showLikeCount && likeCount > 0 && (
                <>
                  <Divider type='vertical' className='mx-1' />
                  <div className='d-flex align-items-center'>
                    <span className={`${classes.icon} ${classes.eye}`}>
                      <LikeIcon color='gray' />
                    </span>
                    <span className='d-flex align-items-center'>
                      <strong>{formatToKMB(likeCount)}</strong>&nbsp;layk
                      {Boolean(likeCount > 1) && 'lar'}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div style={{ textAlign: 'end' }}>
              {labels?.map((label) => (
                <span
                  key={label.id}
                  style={{ marginLeft: '.3rem', marginBottom: '0.3rem', display: 'inline-block' }}
                >
                  <Label>{label.name}</Label>
                </span>
              ))}
              {props.showStatus && status && <Status className='ms-1' status={status} />}
            </div>
          </div>
          {author && (
            <div className={classes.footer} style={{ marginTop: '.2rem' }}>
              <Author {...addAmazonUri(author)} />
            </div>
          )}
        </a>
      </Link>
    </div>
  );
};
