import { ChangeEvent, KeyboardEventHandler, memo, useCallback, useEffect, useRef } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import classes from './Paragraph.module.scss';
import { IParagraphData } from './Paragraph.types';

const debounce = debouncer<IParagraphData>();

export const Paragraph = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IParagraphData>) {
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      if (isEditable && !data.text) ref.current?.focus();
    }, []);

    const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
      (event) => {
        if (!ref.current) return;

        textBlockKeydownHandler(event, api, ref.current, id, {
          shouldMergeOnBackspace: true,
        });
      },
      [data, id],
    );

    const changeHandler = (event: ChangeEvent<HTMLParagraphElement>) => {
      debounce({ text: event.target.innerHTML }, (d) =>
        api.setBlock<IParagraphData>({ id, type, data: d }),
      );
    };

    return (
      <p
        id={id}
        onKeyDown={keydownHandler}
        className={classes.paragraph}
        ref={ref}
        contentEditable={isEditable}
        onInput={changeHandler}
        dangerouslySetInnerHTML={{ __html: data.text ?? '' }}
      />
    );
  },
  () => true,
);
