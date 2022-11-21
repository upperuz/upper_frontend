import { ArticleImg, Author, Label } from 'components';
import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';
import { addAmazonUri, formatToKMB, getClassName, toDateString } from 'utils';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ className, article, author, redirectUrl }) => {
  const {
    title,
    content,
    updatedDate,
    publishedDate,
    viewCount,
    labels = [],
    id,
    imgUrl,
  } = article;
  const rootClassName = getClassName(classes.article, className);
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

  const renderDate = (): JSX.Element => {
    if (updatedDate)
      return (
        <>
          <strong>{toDateString(updatedDate)}</strong> da yangilangan
        </>
      );
    if (publishedDate) return <strong>{toDateString(publishedDate)}</strong>;
    return <></>;
  };

  return (
    <div className={rootClassName}>
      <Link href={`${redirectUrl || '/articles'}/${id}`}>
        <a>
          <div className={classes.body}>
            <div className={classes['text-content']}>
              <h2 className={classes.title}>{title}</h2>
              <p className={classes.content} ref={contentRef} />
            </div>
            <ArticleImg imgUrl={imgUrl} />
          </div>
        </a>
      </Link>
      <div className={classes.footer}>
        <div className={classes.stats}>
          <span>{renderDate()}</span>
          &nbsp; &nbsp;
          {viewCount > 0 && (
            <span>
              <strong>{formatToKMB(viewCount)}</strong> martta o`qilgan
            </span>
          )}
        </div>
        <div>
          {labels?.map((label) => (
            <span key={label.id} style={{ marginLeft: '.3rem' }}>
              <Label>{label.name}</Label>
            </span>
          ))}
        </div>
      </div>
      <div className={classes.footer} style={{ marginTop: '.5rem' }}>
        {author ? <Author {...addAmazonUri(author)} /> : <div />}
      </div>
    </div>
  );
};
