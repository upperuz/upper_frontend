import { NextIcon, PrevIcon } from 'components/icons';
import { Clickable, TabButton } from 'components/lib';
import { COMMON_SPACE_FROM_TOP } from 'components/wrappers';
import { useTheme } from 'hooks';
import { FC, useRef } from 'react';
import { getClassName } from 'utils';

import classes from './Labels.module.scss';
import { ILabelsProps } from './Labels.types';

export const Labels: FC<ILabelsProps> = (props) => {
  const { labels = [], activeLabel } = props;
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const { themeColors } = useTheme();

  const labelSelectHandler = (id: string) => (): unknown => props.onSelect(id);

  const moveLabels = (space: number = 300) => {
    return () => {
      const labelsContainer = labelsContainerRef.current;
      if (!labelsContainer) return;
      const leftScroll = labelsContainer.scrollLeft;
      labelsContainer.scrollTo({ left: leftScroll + space, behavior: 'smooth' });
    };
  };

  const isContentOverflowed = labelsContainerRef.current
    ? labelsContainerRef.current.scrollWidth > labelsContainerRef.current.clientWidth
    : false;

  return (
    <div
      className={getClassName(classes.root, props.className)}
      style={{
        paddingTop: COMMON_SPACE_FROM_TOP,
        marginTop: '-' + COMMON_SPACE_FROM_TOP,
        ...(props.style ?? {}),
      }}
    >
      {isContentOverflowed && (
        <Clickable
          data-testid='prev-btn'
          className={classes['next-btn']}
          onClick={moveLabels(-300)}
        >
          <PrevIcon color={themeColors.icon} />
        </Clickable>
      )}
      <div className={classes['labels-container']} id='labels' ref={labelsContainerRef}>
        <div className={classes['lebels-list']}>
          {labels.map((label) => (
            <TabButton
              onClick={labelSelectHandler(label)}
              color={label == activeLabel ? 'primary' : 'outlined'}
              key={label}
            >
              {label}
            </TabButton>
          ))}
        </div>
      </div>
      {isContentOverflowed && (
        <Clickable data-testid='next-btn' className={classes['next-btn']} onClick={moveLabels(300)}>
          <NextIcon color={themeColors.icon} />
        </Clickable>
      )}
    </div>
  );
};
