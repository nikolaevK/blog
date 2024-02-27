import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface UserProfileInterface {
  user: User;
}

export default function UserProfile({ user }: UserProfileInterface) {
  return (
    <div className="py-12 lg:py-24">
      <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <div className="space-y-2">
            <Image
              alt="Avatar"
              className="mx-auto rounded-full"
              height="96"
              src={user.imageUrl}
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="96"
            />
            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-3xl">
              @{user.userName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
