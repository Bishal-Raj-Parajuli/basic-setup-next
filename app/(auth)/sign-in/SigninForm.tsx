"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { signInUser } from "../actions";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const signInFormSchema = z.object({
  email: z.string().min(2, { message: "This field is required." }).email(),
  password: z
    .string()
    .min(2, { message: "This field is required." })
    .refine((value) => /\S/.test(value), {
      message: "Field cannot be empty or contain only whitespace",
    }),
});

const SigninForm = () => {
  const signInForm: UseFormReturn<z.infer<typeof signInFormSchema>> = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const result = await signInUser(values);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error Signing In",
        description: result.error,
      });
    } else {
      toast({
        title: "Success !",
        description: "Welcome Back",
      });
      redirect("/dashboard");
    }
  }
  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="auth-form-btn">
          Login
        </Button>
        <p className="text-xs text-center">
          New to Basic Next App ? <Link href="/sign-up">Sign-up</Link>
        </p>
      </form>
    </Form>
  );
};

export default SigninForm;
