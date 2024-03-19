'use client'

import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import useLexicalEditable from '@lexical/react/useLexicalEditable'
import { EditorState } from 'lexical'

import * as React from 'react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSharedHistoryContext } from './context/SharedHistoryContext'
import './index.css'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import InlineImagePlugin from './plugins/InlineImagePlugin'
import LinkPlugin from './plugins/LinkPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'

interface OnChangePluginProps {
  onChange: (editorState: EditorState) => void
}

function OnChangePlugin({ onChange }: OnChangePluginProps): null {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [editor, onChange])

  return null
}

const SetEditorState = ({ editorState }: { editorState: string }) => {
  const [editor] = useLexicalComposerContext()
  const [isSetState, setIsSetState] = useState(false)

  React.useEffect(() => {
    if (editorState && !isSetState) {
      try {
        const state = editor.parseEditorState(editorState as string)
        console.log(state)
        if (state) {
          editor.setEditorState(state)
          setIsSetState(true)
        }
      } catch (error) {
        console.error('Error parsing editorState:', error)
      }
    }
  }, [editorState, isSetState])

  return null
}

interface EditorPrps {
  name: string
}

export default function Editor({ name }: EditorPrps): JSX.Element {
  const { historyState } = useSharedHistoryContext()

  const { setValue, watch } = useFormContext()

  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON()
    setValue(name, JSON.stringify(editorStateJSON), {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const isEditable = useLexicalEditable()
  const text = 'Enter some rich text...'
  const placeholder = <Placeholder>{text}</Placeholder>

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      <SetEditorState editorState={watch(name) ?? ''} />
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <HistoryPlugin externalHistoryState={historyState} />
      <ClearEditorPlugin />
      <HashtagPlugin />
      <OnChangePlugin onChange={onChange} />
      <RichTextPlugin
        contentEditable={
          <div className="editor-scroller">
            <div className="editor" ref={onRef}>
              <ContentEditable />
            </div>
          </div>
        }
        placeholder={placeholder}
        ErrorBoundary={LexicalErrorBoundary}
      />

      <ListPlugin />
      <CheckListPlugin />
      <ImagesPlugin />
      <InlineImagePlugin />

      <LinkPlugin />

      {!isEditable && <LexicalClickableLinkPlugin />}
      <HorizontalRulePlugin />

      <TabIndentationPlugin />

      {floatingAnchorElem && !isSmallWidthViewport && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
          <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
        </>
      )}
    </div>
  )
}
