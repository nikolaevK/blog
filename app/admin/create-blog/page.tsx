import CreatePostForm from "./components/create-post-form";

type Props = {};

export default function CreateBlogPage({}: Props) {
  return (
    <div className="w-full h-full p-6 mb-12 md:mb-0">
      <CreatePostForm />
    </div>
  );
}
