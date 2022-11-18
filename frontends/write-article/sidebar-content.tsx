import { Button, Divider, IOption, MultiSelect } from 'components';
import { useShortCut } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useCreateArticleMutation, useLazySearchLabelsQuery } from 'store/apis';
import { getEditor, setArticle } from 'store/states';
import { ILabel } from 'types';
import { compressUnsplashImage, convertLabelsToOptions } from 'utils';

export const SidebarContent: FC = () => {
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>([]);
  const [createArticle, createArticleStatus] = useCreateArticleMutation();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const editor = useAppSelector(getEditor);

  const save = async (): Promise<void> => {
    if (!editor) return Promise.reject();

    const editorData = await editor.save();
    const blocks = editorData.blocks.map(compressUnsplashImage);
    const title = blocks.find((block) => block.type === 'header')?.data.text;
    const labels: ILabel[] = selectedLabels.map((l) => ({ name: l.label, id: +l.value }));
    const newArticle = await createArticle({
      title,
      blocks,
      labels,
    }).unwrap();
    dispatch(setArticle(newArticle));
    router.push(`/user/articles/${newArticle.id}`);
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
  };

  const SearchLabels = (value: string): void => {
    value && searchLabels(value);
  };

  const isSavePressed = useShortCut('s');

  useEffect(() => {
    if (isSavePressed) save();
  }, [isSavePressed]);

  return (
    <>
      <Button onClick={save} className='w-100' loading={createArticleStatus.isLoading}>
        Saqlash
      </Button>
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <div>
        <label htmlFor='labels' className='mb-1 d-block'>
          Teglar
        </label>
        <MultiSelect
          onChange={labelsChangeHandler}
          onInputDebounce={SearchLabels}
          renderItem={(item): JSX.Element => {
            return (
              <div className='p-1 pointer'>
                <h4 className='m-0'>{item.label}</h4>
                <p className='m-0 mt-1 fs-1'>{item.description}</p>
              </div>
            );
          }}
          options={convertLabelsToOptions(searchLabelsRes.data)}
          inputPlacegolder='Qidirish uchun yozing'
        />
      </div>
    </>
  );
};
