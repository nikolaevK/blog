import { Suspense } from "react";

import Loading from "./loading";
import PostsPage from "./page";

export default async function DashboardLayout() {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <PostsPage />
      </Suspense>
    </section>
  );
}
