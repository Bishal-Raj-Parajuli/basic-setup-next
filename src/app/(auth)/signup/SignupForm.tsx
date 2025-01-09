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
import { FormState, submitSignupForm } from "./actions";

export default function SignupForm() {
  const initialState: FormState = {};

  const [formState, formAction] = useActionState(
    submitSignupForm,
    initialState
  );

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Signup</CardTitle>
          <CardDescription>Enter your details to signup</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  type="text"
                  placeholder="Jhon Doe"
                  defaultValue={formState.data?.fullName}
                />
                {formState.errors?.fullName && (
                  <div className="text-red-500 text-xs">
                    {formState.errors.fullName.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="jhonDoe@example.com"
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
                  <Label htmlFor="password">Password</Label>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  name="confirmPassword"
                  type="password"
                  defaultValue={formState.data?.confirmPassword}
                />
                {formState.errors?.confirmPassword && (
                  <div className="text-red-500 text-xs">
                    {formState.errors.confirmPassword.map((error) => (
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
              Already Have a Account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
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
