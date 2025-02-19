import { useCallback, useEffect } from 'react';
import { ArrayElement } from 'utils/typescript';

import { IEditorContext, TAddBlocks, useEditorContext } from '../../context';
import { TToolTag } from '../../tools/tool.types';
import { getNodes } from '../../utils/html';
import janitor from '../../utils/janitor';

type TAddBlocksFirstParam = Parameters<TAddBlocks>[0];

export const usePasteListener = () => {
  const { addBlocks, toolsTagsMap, focusedBlock, tools, removeBlock, isEditable } =
    useEditorContext();

  const pasteHandler = useCallback(
    (event: ClipboardEvent) => {
      const { clipboardData } = event;
      // if clipboard is empty -> do nothing
      if (!clipboardData || !focusedBlock) return;

      // if focused block tool should ignore paste listener -> return
      const tool = tools[focusedBlock.type];
      if (tool.ignoreGlobalPasteListener) return;

      event.stopPropagation();
      event.preventDefault();

      const htmlData = clipboardData.getData('text/html');

      // if html data is empty check if text data is copied to the clipboard
      if (!htmlData) {
        const textData = clipboardData.getData('text/plain');
        document.execCommand('insertHtml', false, textData);
        return;
      }

      const htmlWithAllAllowedTags = janitor.clean(htmlData);

      // if html contains only inline text -> insert it into current block
      const htmlWithInlineTextTags = janitor.clean(htmlData, {
        onlyInlineTags: true,
      });

      // if inline tags data and all tags data are equal
      // or tool doesn't enable node generation on paste
      if (htmlWithInlineTextTags === htmlWithAllAllowedTags || !tool.addBlocksOnPaste) {
        document.execCommand('insertHtml', false, htmlWithInlineTextTags);
        return;
      }

      // get nodes from cleaned html
      const nodes = getNodes(htmlWithAllAllowedTags);
      // generating editor blocks from html nodes
      const blocks = generateBlocks(nodes, toolsTagsMap, tools);

      // adding blocks into editor state
      addBlocks(blocks, focusedBlock.id);

      // if focused block content is empty -> remove this block
      const focusedBlockContent = focusedBlock.data.text?.trim();
      if (!focusedBlockContent) removeBlock(focusedBlock.id);
    },
    [addBlocks, removeBlock, toolsTagsMap, focusedBlock, tools],
  );

  useEffect(() => {
    if (!isEditable) return;

    document.addEventListener('paste', pasteHandler, true);

    return () => document.removeEventListener('paste', pasteHandler, true);
  }, [pasteHandler, isEditable]);
};

function generateBlocks(
  nodes: Node[],
  toolsTagsMap: IEditorContext['toolsTagsMap'],
  tools: IEditorContext['tools'],
): TAddBlocksFirstParam {
  return nodes.reduce<TAddBlocksFirstParam>((res, node) => {
    const nodeName = node.nodeName.toLowerCase() as TToolTag;

    if (!Object.hasOwn(toolsTagsMap, nodeName)) return res;

    const toolTypes = toolsTagsMap[nodeName] ?? [];

    toolTypes.forEach((toolType) => {
      const tool = tools[toolType];
      const data = tool.onPaste?.(node);

      if (data) {
        res.push({
          type: toolType,
          data,
        } satisfies ArrayElement<TAddBlocksFirstParam>);
      }
    });

    return res;
  }, []);
}
