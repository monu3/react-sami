import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "cn";
import type { ChangeEvent, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import logo from "/assets/eventlogo.png";

const TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

type LoginFormProps = React.ComponentProps<"div"> & {
  username: string;
  password: string;
  statusMsg: string;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTurnstileSuccess: (token: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function LoginForm({
  className,
  username,
  password,
  statusMsg,
  onUsernameChange,
  onPasswordChange,
  onTurnstileSuccess,
  onSubmit,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back Chief</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Dashboard
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={onUsernameChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={onPasswordChange}
                  required
                />
              </Field>
              <Field>
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={onTurnstileSuccess}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              {statusMsg && (
                <p className="text-center text-sm text-destructive">
                  {statusMsg}
                </p>
              )}
            </FieldGroup>
          </form>
          <div className="relative hidden bg-[#f4eace] md:block">
            <img
              src={logo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
