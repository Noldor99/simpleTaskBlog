import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';

import { ImageNode } from './ImageNode';
import { InlineImageNode } from './InlineImageNode';
import { ExactlyNodes } from '@/components/editor/nodes/PlaygroundNodes';

const nodes: (Klass<LexicalNode> | LexicalNodeReplacement)[] = [
  ...ExactlyNodes,
  ImageNode,
  InlineImageNode,

];

export default nodes;
