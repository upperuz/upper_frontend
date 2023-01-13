import { ChangeableText } from 'components';
import { FC, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  addTutorialSection,
  changeTutorialName,
  getTutorialName,
  getTutorialSections,
} from 'store/states';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { RemoveArticleModal, RemoveSectionModal, Section } from './components';
import classes from './TutorialSidebar.module.scss';

const AddFolderIcon = ICONS.addFolder;
const PlusIcon = ICONS.plus;

export const TutorialSidebar: FC = () => {
  const tutorialName = useAppSelector(getTutorialName);
  const sections = useAppSelector(getTutorialSections);
  const dispatch = useAppDispatch();

  const addSectionHandler = (): void => {
    const newSection = { id: uuid(), name: "Bo'lim nomi", articles: [] };
    dispatch(addTutorialSection(newSection));
  };

  const tutorialNameChangeHandler = (name: string): unknown => dispatch(changeTutorialName(name));

  return (
    <div className={classes.root}>
      <RemoveArticleModal />
      <RemoveSectionModal />
      <div className={classes.header}>
        <ChangeableText value={tutorialName} onSubmit={tutorialNameChangeHandler} />
        <span className={classes.icon} onClick={addSectionHandler}>
          <AddFolderIcon />
        </span>
      </div>
      <div className={classes.body}>
        {sections.map((section) => (
          <Fragment key={section.id}>
            <Section section={section} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
