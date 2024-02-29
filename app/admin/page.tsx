import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import AdminPosts from "./components/admin-posts";
import ProfileSection from "./components/profile-section";

export default async function Admin() {
  const { userId } = auth();

  if (!userId) return null;
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    // include: {
    //   posts: true
    // }
  });
  if (!user) return null;
  return (
    <div className="w-full mb-16 md:mb-0">
      <ProfileSection user={user} />
      <AdminPosts />
    </div>
  );
}
