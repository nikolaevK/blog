"use client";

import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { toast } from "./use-toast";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (value: string) => void;
  urls: string[];
}

export default function ImageUpload({
  onChange,
  onRemove,
  urls,
  disabled,
}: ImageUploadProps) {
  function onUpload(result: any) {
    if (!result) return;
    onChange(result.info.secure_url);
  }

  function onCopy(url: string) {
    navigator.clipboard.writeText(url);
    toast({
      description: "Image url copied",
    });
  }

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Upload a Photo</CardTitle>
        <CardDescription>Select a photo from your device</CardDescription>
        <CldUploadWidget uploadPreset="ylc5z4ea" onUpload={onUpload}>
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={handleOnClick}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload
              </Button>
            );
          }}
        </CldUploadWidget>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {urls.map((url) => (
          <div key={url} className="w-full flex items-center space-x-2">
            <Label>URL</Label>
            <Input readOnly value={`![alt](${url})`} />
            <Button size="sm" onClick={() => onCopy(`![alt](${url})`)}>
              Copy
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
