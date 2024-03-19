import { Label } from "@radix-ui/react-label"

import React from "react"
import { useFormContext } from "react-hook-form"

import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface WrapFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}
const FormInput: React.FC<WrapFormInputProps> = ({ name, label, ...props }) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <Label className="text-sm1">{label}</Label>}
          <Input
            className="w-full"
            {...props}
            {...field}
            value={field.value || ""}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
