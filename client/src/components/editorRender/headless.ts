import nodes from './nodes';

import { htmlConfig } from './html-config';
import { createHeadlessEditor as _createHeadlessEditor } from '@lexical/headless';
import PlaygroundEditorTheme from '../editor/themes/PlaygroundEditorTheme';

const createHeadlessEditor = () => {
  return _createHeadlessEditor({
    namespace: 'ssr-editor',
    nodes: [...nodes],
    theme: PlaygroundEditorTheme,
    onError: () => { },
    html: htmlConfig,
  });
};

export default createHeadlessEditor;
