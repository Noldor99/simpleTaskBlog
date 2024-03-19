
import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { OverflowNode } from '@lexical/overflow';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ImageNode } from './ImageNode';
import { InlineImageNode } from './InlineImageNode';


export const ExactlyNodes: (Klass<LexicalNode> | LexicalNodeReplacement)[] = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  MarkNode,
]

const PlaygroundNodes: (Klass<LexicalNode> | LexicalNodeReplacement)[] = [
  ...ExactlyNodes,
  ImageNode,
  InlineImageNode,
];

export default PlaygroundNodes;
