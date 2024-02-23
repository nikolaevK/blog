import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CreatePostForm from "./components/create-post-form";

type Props = {};

export default function CreateBlogPage({}: Props) {
  return (
    <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <CreatePostForm />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
