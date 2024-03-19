'use client'

import { useCreateContent, useUpdateContent } from '@/ahooks/useContent'

import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import { AppEditor } from '@/components/editor/AppEditor'
import FormInput from '@/components/form/FormInput'
import { FormRadioGroup, TRadioItem } from '@/components/form/FormRadioGroup'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { ContentSchema, IContentSchema } from '@/actions/client/contentAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { urlRevalidate } from '@/lib/urlRevalidate'
import { cn } from '@/lib/utils'

import { IContent } from '@/types/content'

type ContentFormPropsType = {
  content?: IContent
}

const radioItems: TRadioItem[] = [
  { value: 'research', label: 'Research' },
  { value: 'commentary', label: 'Commentary' },
  { value: 'news', label: 'News' },
]

export const ContentForm: FC<ContentFormPropsType> = ({ content }: ContentFormPropsType) => {
  const form = useForm<IContentSchema>({
    mode: 'onChange',
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      router: content?.router || '',
      title: content?.title || '',
      description: content?.description || '',
      text: content?.text || '',
      variant: content?.variant || '',
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createContent, isPending: pendingContent } = useCreateContent()
  const { mutateAsync: updateContent, isPending: pendingUpdate } = useUpdateContent(
    content?.id || ''
  )
  const isPending = pendingContent || pendingUpdate

  function onSubmit(data: IContentSchema) {
    const dirtyFields = formState.dirtyFields

    const changedFields: IContentSchema = Object.keys(dirtyFields).reduce((result, key) => {
      result[key as keyof IContentSchema] = data[key as keyof IContentSchema]

      return result
    }, {} as IContentSchema)

    const mutation = content ? updateContent : createContent

    mutation(changedFields, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Create success' })
        urlRevalidate('/writing')
        if (content) {
          urlRevalidate(`/writing/${content?.id}`)
        }
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="paper-sharp space-y-2">
            <FormInput name="title" placeholder="Content title" label="title:" />
            <FormInput name="router" placeholder="router" label="router:" />
            <FormTextarea name="description" placeholder="Content description" />
            <div className="mt-2 p-[10px]">
              <FormRadioGroup name="variant" radioItems={radioItems} />
            </div>
          </div>
          <AppEditor name="text" />
          <div className="">
            <Button
              type="submit"
              className="mt-6"
              disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
            >
              Save content
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
