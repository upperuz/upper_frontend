import { ZoomImage } from 'components';
import { useTheme } from 'hooks';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';
import { addBlogAmazonUrl, isRemoteUrl } from 'utils';
import { getClassName } from 'utils/common';
import { getImageType } from 'utils/image';

import classes from './Avatar.module.scss';
import { IAvatarProps } from './Avatar.types';

export const Avatar: FC<IAvatarProps> = ({
  size = 'small',
  imgUrl,
  zoomable = false,
  isLocal = false,
  ...props
}) => {
  const [error, setError] = useState<string>();
  const { themeColors } = useTheme();
  const className = getClassName(classes.avatar, classes[`avatar--${size}`], props.className);

  const image = useMemo(() => {
    if (!imgUrl || error) return <Image src='/social_medi_logo.png' alt='UPPER' layout='fill' />;
    const imageType = getImageType(imgUrl);
    const isRemote = isRemoteUrl(imgUrl);
    const finalUrl = isRemote || isLocal ? imgUrl : addBlogAmazonUrl<string>(imgUrl);

    if (!zoomable || !imageType.zoomable)
      return (
        <Image
          src={finalUrl}
          onError={(): unknown => setError('Image load error')}
          alt='UPPER'
          layout='fill'
          objectFit='cover'
        />
      );

    return (
      <ZoomImage
        src={finalUrl}
        alt='UPPER'
        layout='fill'
        objectFit='cover'
        onError={(): unknown => setError('Image load error')}
        className={classes.zoomable}
      />
    );
  }, [imgUrl, zoomable, error]);

  return (
    <div className={className} style={{ borderColor: themeColors.avatar.border }}>
      {image}
    </div>
  );
};
