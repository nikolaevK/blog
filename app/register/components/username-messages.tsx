"use client";

interface UsernameMessages {
  username: string;
  isValid: boolean | undefined;
  loading: boolean | undefined;
}

export default function UsernameMessages({
  username,
  isValid,
  loading,
}: UsernameMessages) {
  if (loading) {
    return <p className="m-auto mt-4 text-primary">Checking...</p>;
  } else if (isValid) {
    return (
      <p className="text-green-600 m-auto mt-4">{username} is available!</p>
    );
  } else if (!isValid && username.length >= 3) {
    return (
      <p className="text-destructive m-auto mt-4">That username is taken!</p>
    );
  } else {
    return <p></p>;
  }
}
