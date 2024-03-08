import { User } from "@prisma/client";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserProfileInterface {
  user: User;
}

export default function UserProfile({ user }: UserProfileInterface) {
  return (
    <div className="py-12 lg:py-24">
      <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="flex flex-col justify-center items-center space-y-3">
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
            <h1 className="text-xl font-bold tracking-tighter md:text-4xl">
              @{user.userName}
            </h1>
          </div>
          {user.description !== null && user.description.length > 0 && (
            <p className="text-xs md:text-lg text-muted-foreground text-center overflow-auto text-balance">
              {user.description}
            </p>
          )}
          <div className="flex gap-2 justify-center ">
            {user.githubLink !== null && user.githubLink.length > 0 && (
              <Link href={user.githubLink}>
                <GithubIcon className="h-5 md:h-7 w-5 md:w-7" />
              </Link>
            )}
            {user.linkedInLink !== null && user.linkedInLink.length > 0 && (
              <Link href={user.linkedInLink}>
                <LinkedinIcon className="h-5 md:h-7 w-5 md:w-7 text-blue-500" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
