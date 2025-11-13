"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/app/actions/auth";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (pending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-7 w-48" />
            <Skeleton className="mx-auto h-5 w-64" />
          </div>

          <div className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground">
            Enter your email and password to login
          </p>
        </div>

        <div className="mt-4">
          <form action={action} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-600">{state.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="xxxxxxxx"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-600">{state.errors.password}</p>
              )}
            </div>
            {state?.message && (
              <p className="text-sm text-red-600">{state.message}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}