"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGNIN_DEFAULT_VALUES } from "@/lib/constants";
import Link from "next/link";

const CredentialsSignInForm = () => {
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={SIGNIN_DEFAULT_VALUES.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Email</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={SIGNIN_DEFAULT_VALUES.password}
          />
        </div>
        <div>
          <Button type="submit" className="w-full" variant={"default"}>
            Sign in
          </Button>
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-primary link"
            target="_self"
          >Sign up</Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
