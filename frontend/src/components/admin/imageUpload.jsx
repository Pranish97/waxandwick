import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  imageUrl,
  setImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const inputRef = useRef(null);

  function handleOnChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveFile() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/image-upload",
      data
    );
    console.log(response, "resp");
    if (response?.data?.success) {
      setImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="font-semi-bold block text-base mt-2">
        Upload Image
      </Label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-3 border-dashed rounded-lg p-4 "
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden mb-5"
          ref={inputRef}
          onChange={handleOnChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col h-32 cursor-pointer justify-center mb-5 items-center"
          >
            <UploadCloudIcon className="w-12 h-12 mb-3 text-muted-foreground" />
            <span>Drag & Drop or Click to Upload Image</span>
          </Label>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileIcon className="w-10 h-10 mr-3 text-primary" />
            </div>
            <p className="text-base font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 cursor-pointer"
              onClick={handleRemoveFile}
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
