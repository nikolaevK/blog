"use client";

import { useDebouncedCallback } from "use-debounce";
import { useCallback, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { checkUsernameAvailability } from "@/app/actions/checkUsernameAvailability";
import UsernameMessages from "./username-messages";
import { createUser } from "@/app/actions/createUser";

export function CreateNameCard() {
  const [usernameValue, setUsernameValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const [loading, setLoading] = useState<boolean | undefined>();

  async function submitUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isValid) {
      setLoading(true);
      await createUser(usernameValue);
      setLoading(false);
    }
  }

  function createUserName(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (inputValue.length < 3) {
      setUsernameValue(inputValue);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(inputValue)) {
      setUsernameValue(inputValue);
      setLoading(true);
      setIsValid(false);
    }
  }

  // UseCallback is needed in order for the whole function to work,
  // it returns the whole function and not just the return statement
  const checkUsername = useCallback(
    useDebouncedCallback(async (username) => {
      if (username.length >= 3) {
        const user = await checkUsernameAvailability(username);
        setIsValid(user === null);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(usernameValue);
  }, [usernameValue]);

  return (
    <Card className="w-[350px] md:w-[600px]">
      <CardHeader>
        <CardTitle>Create Username</CardTitle>
        <CardDescription>
          Enter your username to create your blog account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitUser} id="userNameForm">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              placeholder="Must be longer than 3 characters"
              value={usernameValue}
              onChange={createUserName}
            />
          </div>
        </form>
        <UsernameMessages
          isValid={isValid}
          loading={loading}
          username={usernameValue}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button form="userNameForm" className="w-full" disabled={!isValid}>
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
