'use server';


import { $generateHtmlFromNodes } from '@lexical/html';
import { JSDOM } from 'jsdom';
import createHeadlessEditor from './headless';

function setupDom() {
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;

  // @ts-expect-error
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/51276
  // https://github.com/capricorn86/happy-dom/issues/1227
  global.window = dom.window;
  global.document = dom.window.document;


  return () => {
    global.window = _window;
    global.document = _document;
  };
}

export async function getHtml(serializedEditorState: string): Promise<string | null> {
  const html: string | null = await new Promise((resolve) => {
    const editor = createHeadlessEditor();

    try {

      const editorState = editor.parseEditorState(serializedEditorState);

      editor.setEditorState(editorState);

      editor.update(() => {
        try {
          const cleanup = setupDom();
          const _html = $generateHtmlFromNodes(editor, null);
          cleanup();

          resolve(_html);
        } catch (e) {
          console.log(e);
          resolve(null);
        }
      });
    } catch (parseError) {
      console.log(parseError);
      resolve(null);
    }
  });

  return html;
}

