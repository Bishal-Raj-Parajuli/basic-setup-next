"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";
import { FormState, submitLoginForm } from "./actions";

export default function LoginForm() {
  const initialState: FormState = {
    data: {
      email: "",
      password: "",
    },
  };

  const [formState, formAction] = useActionState(submitLoginForm, initialState);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue={formState.data?.email}
                />
                {formState.errors?.email && (
                  <div className="text-red-500 text-xs">
                    {formState.errors.email.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  name="password"
                  type="password"
                  defaultValue={formState.data?.password}
                />
                {formState.errors?.password && (
                  <div className="text-red-500 text-xs">
                    {formState.errors.password.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
