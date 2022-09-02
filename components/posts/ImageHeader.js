import Moment from "react-moment";

function ImageHeader({ image, username, updated_at }) {
  const tag = username.split(" ").join("").toLocaleLowerCase();

  return (
    <div className="mt-6 flex items-center font-medium">
      <img
        src={image !== null ? image : "/profile.jpg"}
        alt="Profile Picture"
        className="mr-4 h-11 w-11 rounded-full"
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800 ">
          {username}{" "}
          <span className="text-gray-500 text-sm">
            &bull; <Moment fromNow>{updated_at}</Moment>
          </span>
        </span>
        <span className="text-sm text-gray-500">@{tag}</span>
      </div>
    </div>
  );
}

export default ImageHeader;
