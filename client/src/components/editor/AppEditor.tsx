'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'

import Editor from './Editor'
import { SharedHistoryContext } from './context/SharedHistoryContext'
import PlaygroundNodes from './nodes/PlaygroundNodes'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'

interface AppEditorProps {
  name: string
}

export function AppEditor({ name }: AppEditorProps): JSX.Element {
  const form = useFormContext()

  const initialConfig = {
    namespace: 'csr-editor',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <Editor name={name} />
        </SharedHistoryContext>
      </LexicalComposer>
      {form.formState.errors[name] && (
        <p className={cn('text-sm font-medium text-destructive')}>
          {form.formState?.errors[name]?.message as keyof typeof form.formState.errors}
        </p>
      )}
    </>
  )
}
