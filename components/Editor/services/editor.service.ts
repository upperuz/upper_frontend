import EditorJs from '@editorjs/editorjs';

import { EDITOR_HOLDER, EDITOR_PLACEHOLDER, IEditorProps } from '../editor.types';
import { getTools } from './editor-tools';

export const createEditor = async ({
  changeHandler,
  isEditable = true,
  content = { blocks: [] },
  placeholder = EDITOR_PLACEHOLDER,
  autoFocus = false,
  onQuizSubmit,
}: IEditorProps = {}): Promise<EditorJs> => {
  const editorJS = (await import('@editorjs/editorjs')).default;
  const tools = await getTools({ onQuizSubmit });

  return new editorJS({
    holder: EDITOR_HOLDER,
    onChange: changeHandler,
    readOnly: !isEditable,
    placeholder,
    data: content,
    tools,
    autofocus: autoFocus,
  });
};
