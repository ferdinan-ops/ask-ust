import { useRef } from "react";
import ImageEdit from "./ImageEdit";

export default function ProfileImage({ user, isEdit, imageHandler }) {
  const imagePicker = useRef(null);
  const bannerPicker = useRef(null);

  return (
    <div className="relative bg-gray-400">
      {isEdit && <ImageEdit bannerPicker={bannerPicker} />}
      <div className="h-[200px]">
        {user.banner && (
          <img
            src={user.banner}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="rounded-full border-4 -bottom-[67px] left-6 border-white absolute overflow-hidden">
        <img
          src={user.image ? user.image : "/profile.jpg"}
          alt=""
          className="w-[134px] h-[134px] "
        />
        {isEdit && <ImageEdit imagePicker={imagePicker} isImage />}
      </div>

      <input
        type="file"
        id="banner"
        accept="image/*"
        ref={bannerPicker}
        onChange={imageHandler}
        hidden
      />
      <input
        id="image"
        type="file"
        accept="image/*"
        ref={imagePicker}
        onChange={imageHandler}
        hidden
      />
    </div>
  );
}
