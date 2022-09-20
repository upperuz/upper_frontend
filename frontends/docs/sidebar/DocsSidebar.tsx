import { Dropdown } from 'components';
import Link from 'next/link';
import { FC } from 'react';

import { DOCS_SIDEBAR_LINKS } from './DocsSidebar.constants';
import classes from './DocsSidebar.module.scss';
import { IDocsSidebarLink, TGetLinksProps } from './DocsSidebar.types';

export const DocsSidebar: FC = () => {
  const getLinks: TGetLinksProps = (links, padding) => {
    const generateLink = (
      links: IDocsSidebarLink[],
      url = '',
      paddingLeft = padding,
    ): JSX.Element[] => {
      return links.map((link, index) => {
        const pdLeftInRem = paddingLeft + padding + 'rem';

        return link.children ? (
          <Dropdown
            key={index}
            title={link.name}
            titleClassName={classes.link}
            paddingLeft={pdLeftInRem}
          >
            {generateLink(link.children, url + link.url, paddingLeft + padding)}
          </Dropdown>
        ) : (
          <Link href={`/docs${url}${link.url}`} key={index}>
            <a className={classes.link} style={{ paddingLeft: pdLeftInRem }}>
              {link.name}
            </a>
          </Link>
        );
      });
    };

    return generateLink(links, '', padding);
  };

  return <div className={classes.container}>{getLinks(DOCS_SIDEBAR_LINKS, 1)}</div>;
};
