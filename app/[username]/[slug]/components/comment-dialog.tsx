"use client";

import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SendCommentForm } from "./send-comment-form";
import { PlusSquareIcon } from "lucide-react";

type Dimensions = { width: number; height: number };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function CommentDialog({
  authenticated,
  postId,
}: {
  authenticated: boolean;
  postId: string;
}) {
  const [isDesktop, setIsDesktop] = useState<Dimensions>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsDesktop(getWindowDimensions());
  }, []);

  if (isDesktop && authenticated && isDesktop.width > 500) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <PlusSquareIcon className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <SendCommentForm postId={postId} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return authenticated ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon">
          <PlusSquareIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <SendCommentForm postId={postId} setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <></>
  );
}
