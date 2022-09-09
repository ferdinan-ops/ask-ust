import { CameraIcon } from "@heroicons/react/outline";
import React from "react";

export default function ImageEdit({ imagePicker, bannerPicker, isImage }) {
  return (
    <div
      className={`absolute ${
        isImage && "top-0"
      } w-full h-full bg-white/20  flex text-font`}
    >
      <div
        className="m-auto w-14 h-14 flex items-center justify-center bg-white/40 hover:bg-[#eee] hover transition rounded-full ease-out cursor-pointer"
        onClick={() =>
          isImage ? imagePicker.current.click() : bannerPicker.current.click()
        }
      >
        <CameraIcon className="h-8" />
      </div>
    </div>
  );
}
