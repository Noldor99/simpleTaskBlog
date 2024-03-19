"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"

import { useRegistration } from "@/ahooks/useAuth"
import FormInput from "@/components/form/FormInput"
import Link from "next/link"
import { IRegisterSchema, RegisterSchema } from "@/actions/client/authAction"

const RegisterForm = () => {
  const { mutate: register, isError } = useRegistration()
  const form = useForm<IRegisterSchema>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (body: IRegisterSchema) => register(body)

  return (
    <Form {...form}>
      <section className="flex flex-1 items-center justify-center p-3">
        <div className="mx-auto w-full max-w-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput name="username" placeholder="Username" />
            <FormInput name="email" placeholder="Email" type="email" />
            <FormInput name="password" placeholder="Password" type="password" />
            <FormInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            <Button
              className="!mt-6 w-full"
              disabled={!form.formState.isValid}
              type="submit"
            >
              Enter
            </Button>
          </form>
          {isError && (
            <p className="text-s mt-4 w-max text-destructive">
              Wrong email or password!
            </p>
          )}
          <Link href="/login" className="text-blue-500 underline mt-4 block">
            Have an account? Login here.
          </Link>
        </div>
      </section>
    </Form>
  )
}

export default RegisterForm
