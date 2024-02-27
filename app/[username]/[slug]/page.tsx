export default function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <div>{slug}</div>;
}
