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
import { signUpUserData } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";

const signUpFormSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "This field is required." })
      .max(50, { message: "Invalid name max 50 char exceded." })
      .refine((value) => /\S/.test(value), {
        message: "Field cannot be empty or contain only whitespace",
      }),
    email: z.string().min(2, { message: "This field is required." }).email(),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." })
      .refine((value) => /\S/.test(value), {
        message: "Field cannot be empty or contain only whitespace",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must have at least 6 characters." })
      .refine((value) => /\S/.test(value), {
        message: "Field cannot be empty or contain only whitespace",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnot match.",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const { toast } = useToast();
  const signInForm: UseFormReturn<z.infer<typeof signUpFormSchema>> = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const result = await signUpUserData(values);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Oops !",
        description: `Error: ${result.error}`,
      });
    } else {
      toast({
        title: "Success !",
        description: `Thankyou for signing up.`,
      });
      redirect("/sign-in");
    }
  }
  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={signInForm.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="example: John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={signInForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="auth-form-btn">
          Submit
        </Button>
        <p className="text-xs text-center">
          Already have a Account ? <Link href="/sign-in">Sign-in</Link>
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
